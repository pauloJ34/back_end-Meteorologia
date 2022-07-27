/*
* Script de criação de um Back-End para recebimento de dados do dispositivo ESP-01
* Projeto de pesquisa do IFRN, construção de uma estação meteorológia de baixo custo
*/

import http from 'node:http';
import express from 'express';
import { Server as SocketServer } from 'socket.io';
import path from 'node:path';
import { DataRepository } from './DataRepository.js';
import { router } from './routes.js';

const app = express();
const server = http.createServer(app);
export const io = new SocketServer(server);

const PORT = 3000;
const HOST = '0.0.0.0';
const dataLimitSize = 500;

app.use(express.static(path.resolve(path.dirname(''), "PUBLIC")));
app.use("/", router);

server.listen(PORT, HOST, async () => {
  try {
    await DataRepository.initializeRepository();
    console.log(`Servidor iniciou em http://localhost:${PORT}`);
  } catch (e) {
    console.error(e);
    process.exit(0);
  }
});

io.on('connection', async () => {
  const data = await DataRepository.getData();

  io.emit("all_dados", data.filter((_, index) => index < dataLimitSize));
  io.emit("dados_recebidos", {}); // ???
});
