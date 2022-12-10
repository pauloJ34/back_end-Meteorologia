import { DataTime } from "../utils/DateTime.js";
import { WriteFileCsv } from "../utils/Management-Files/WriteFileCSV.js";
import { sendDados } from './../utils/Management-Files/ReadFileCSV.js';
import { SendDados } from './../utils/SendData.js';
import express from 'express';
import { dir, archive, data, io } from './../index.js';
let contador= 0;
let somente_dados = [];

export function Routers(app){
  app.use(express.static(dir+"/src/PUBLIC"));
  
  app.get("/", (req , res)=>{
    // res.send({dir})
    // res.sendFile("index.html");
  });
  /*baixar arquino csv*/
  app.get("/dados",(req, res) =>{
    res.sendFile(dir+archive);
  });
  app.get("/update", (req,res)=>{

    let dataT=DataTime();

    
    data.dadosArray = {
        data : dataT.split(',')[0].replace("\n", ""),
        hora : dataT.split(',')[1],
    }
    
    Object.keys(req.query).forEach((variavel)=>{
        //data.dadosArray[variavel] = req.query[variavel]
        dataT+=","+req.query[variavel];
    })
    
    somente_dados.push(data)
    sendDados.push(dataT)
    WriteFileCsv(dataT);
    
    contador++;
    res.send(`${contador}`);
    // console.log(sendDados)
    io.emit("all_dados", SendDados(sendDados));
    
    io.emit("dados_recebidos", dataT);
    // data.somenteDados.append(dataT);
  })
}


export {somente_dados};
