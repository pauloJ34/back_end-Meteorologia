/*
* Script de criação de um Back-End para recebimento de dados do dispositivo ESP-01
* Projeto de pesquisa do IFRN, construção de uma estação meteorológia de baixo custo
*/

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require("socket.io")(server);
const fs = require('fs');
const port = 3000;
let somente_dados = [];
let dadosArray = {};
let contador = 0;

const dadosAnSend = ()=>{
	let return_dado=[];
	for(let x = 0; x<500 ; x++){	//pegar 500 ultimos itens
		return_dado.push(somente_dados[(somente_dados.length-1)-x]);
	}
	return return_dado;
}

app.use(express.static(__dirname+"/PUBLIC"))
app.get("/", (req , res)=>{
	res.sendFile("index.html");
})
/*baixar arquino csv*/
app.get("/dados",(req, res) =>{
	res.sendFile(__dirname+"/dados/dados.csv");
})
app.get("/update", (req,res)=>{
	let dados=dataTime();
	
	dadosArray = {
		data : dados.split(',')[0].replace("\n", ""),
		hora : dados.split(',')[1],
	}
	
	Object.keys(req.query).forEach((variavel)=>{
		dadosArray[variavel] = req.query[variavel]
		dados+=","+req.query[variavel];
	})
	
	somente_dados.push(dados);
	
	writeFileCsv(dados);
	
	contador++;
	res.send(`${contador}`);
	
	io.emit("dados_recebidos", dadosArray);
})

server.listen(port,"0.0.0.0", () => {
	newRepositorio();
	newFileCSV();
	readFileCsv();
	console.log(`Servidor iniciou em http://localhost:${port}/`);
})

io.on('connection', (socket)=>{
	io.emit("all_dados", dadosAnSend());
	io.emit("dados_recebidos", dadosArray);
})

function dataTime(){
	let data = new Date();
	data.setTime(data.getTime() + (-3*60*60*1000));//	3 horas => milisegundos -> segundos -> minutos -> horas
	let dia = ("0" + data.getDate()).slice(-2)
	let mes = ("0" + (data.getMonth() + 1)).slice(-2);
	let ano = data.getFullYear();
	let hora = data.getHours();
	let minutos = data.getMinutes();
	let segundo = data.getSeconds();
	
	return `\n${dia}/${mes}/${ano},${hora}:${minutos}:${segundo}`
}

async function newRepositorio(){
	const dir = __dirname+"/dados";
	if(!fs.existsSync(dir)){
		fs.mkdir(dir,(err)=>{
			if(err){
				console.log("erro ao criar o diretório!");
				return;
			}
			console.log("diretório criado com sucesso.");
		})
	}else{ console.log("diretório já existe."); }
}

async function newFileCSV(){
	const dir = __dirname+"/dados/dados.csv";
	const dado = "data,time,temperatura,umidade do ar,pluviometro,luminosidade,umidade do solo";
	//console.log(fs.existsSync(dir))
	if(!fs.existsSync(dir)){
		fs.writeFile(dir,dado,(err)=>{
			if (err) {
				console.log("erro ao criar o arquivo");
				return;
			}console.log("arquivo criado com sucesso.");
		})
	}else{ console.log("arquivo já existe."); }
}
async function writeFileCsv(dados){
	const file=__dirname+'/dados/dados.csv';
	if(fs.existsSync(file)){
		write(dados);
	}else{
		newFileCSV();
		write();
	}
}
async function write(dados){
	fs.appendFile(__dirname+'/dados/dados.csv',dados,(err)=>{
		if(err){
			console.log("erro ao escrever no arquivo");
			return Promise.resolve()
		}
		console.log("escrivo no arquivo com sucesso");
	})
}
function readFileCsv(){
	fs.readFile(__dirname+"/dados/dados.csv", 'utf8', (err, dado) => {
		if(err){
			console.log("erro ao ler");
			return
		}
		const dados= dado.split("\n")
		dados.shift();
		somente_dados = dados;
	})
}
