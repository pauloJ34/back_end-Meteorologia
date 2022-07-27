import { Router } from "express";
import { io } from './server.js'
import path from 'node:path';
import { DataRepository } from "./DataRepository.js";
import { dateTime } from "./utils/dateTime.js";

const router = Router();
let updatedTimes = 0;

router.get("/", (_req, res) => res.sendFile("index.html"));

router.get("/dados", (_req, res) => res.sendFile(path.resolve(path.dirname(''), "dados", "dados.csv")));

router.get("/update", async (req, res) => {
  const receivedData = {};

  const [date, time] = dateTime().split(',');
  receivedData.data = date;
  receivedData.hora = time;

  Object.entries(req.query).forEach(([key, value]) => {
    receivedData[key] = value;
  })

  const data = Object.values(receivedData).join(',');
  await DataRepository.pushData(data);
  updatedTimes++;

  res.send(updatedTimes.toString());
  io.emit("dados_recebidos", receivedData);
})

export { router };