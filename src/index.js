/*
  Script de criação de um Back-End para recebimento de dados do dispositivo ESP-01
  Projeto de pesquisa do IFRN, construção de uma estação meteorológia de baixo custo
*/
import express from 'express';
import {createServer} from 'http';
// import * as fs from 'fs';
import {Server} from 'socket.io';
import path from 'path';
import { Routers } from './router/Router.js';
import { NewRepository } from './utils/Management-Files/NewRepository.js';
import { NewFileCSV } from './utils/Management-Files/NewFileCSV.js';
import { ReadFileCsv, sendDados } from './utils/Management-Files/ReadFileCSV.js';
import { SendDados } from './utils/SendData.js';


const app = express();
const server = createServer(app);
const io = new Server(server);
const dir = process.cwd();
// const fs = fs;
const port = process.env.PORT || 3000;
const archive = "\\src\\dados\\dados.csv"
const data={
  dadosArray : {},
}

export {dir, archive, data, io};

// console.log(__dirname)

Routers(app);

server.listen(port,"0.0.0.0", async () => {
	await NewRepository();
	await NewFileCSV();
	await ReadFileCsv();
  // console.log(await ReadFileCsv())
	console.log(`Servidor iniciou em http://localhost:${port}/`);
})

io.on('connection', async (socket)=>{
  await ReadFileCsv();
  // console.log(sendDados)
  // console.log(dados.somenteDados)
  // console.log(dados.somenteDados)
	io.emit("all_dados", SendDados(sendDados));
  // console.log(typeof somente_dados)
	io.emit("dados_recebidos", sendDados[sendDados.length-1])
})