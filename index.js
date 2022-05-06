/*
* Script de criação de um Back-End para recebimento de dados do dispositivo ESP-01
* Projeto de pesquisa do IFRN, construção de uma estação meteorológia de baixo custo
*/

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const fs = require('fs');
const port = 3000;

let contador = 0;



app.get("/update", (req,res)=>{
	
	let dados='';
	dados=dataTime()+","+req.query.field1+","+req.query.field2+","+req.query.field3+","+req.query.field4+","+req.query.field5
	writeAquivo(dados);
    contador++;
    res.send(`${contador}`);


})

server.listen(port, () => {
    newRepositorio();
    newAquivo();
    console.log(`Servidor iniciou em http://localhost:${port}/`)
})

function dataTime(){
	let data = new Date();
	let dia = ("0" + data.getDate()).slice(-2)
	let mes = ("0" + (data.getMonth() + 1)).slice(-2);
	let ano = data.getFullYear();
	let hora = data.getHours();
	let minutos = data.getMinutes();
	let segundo = data.getSeconds();

	return `\n${dia}/${mes}/${ano},${hora}:${minutos}:${segundo}`
}

async function newRepositorio(){
    const dir = "./dados";
    if(!fs.existsSync(dir)){
        fs.mkdir(dir,(err)=>{
            if(err){
                console.log("erro ao criar o diretório!");
                return;
            }console.log("diretório criado com sucesso.");
        })
    }else{ console.log("diretório já existe."); }
}

async function newAquivo(){
	const dir = "./dados/dados.csv";
	const dado = "data,time,temperatura,umidade do ar,pluviometro,luminosidade,umidade do solo";
	console.log(fs.existsSync(dir))
	if(!fs.existsSync(dir)){
        fs.writeFile(dir,dado,(err)=>{
            if (err) {
            	console.log("erro ao criar o arquivo");
            	return;
            }console.log("arquivo criado com sucesso.");
        })
    }else{ console.log("arquivo já existe."); }
}

async function writeAquivo(dados){
	fs.appendFile('./dados/dados.csv',dados,(err)=>{
		if(err){
			console.log("erro ao escrever no arquivo");
			return
		}console.log("escrivo no arquivo com sucesso");
	})
}
