let max = 10;
const socket = io.connect('/');
const variavel= [
	document.querySelector("#data"),
	document.querySelector("#hora"),
	document.querySelector("#fild1"),
	document.querySelector("#fild2"),
	document.querySelector("#fild3"),
	document.querySelector("#fild4"),
	document.querySelector("#fild5")
];
socket.on("dados_recebidos", (arg)=>{
	Object.keys(arg).forEach((key,id)=>{
		variavel[id].innerText=arg[key];
	})
})
socket.on('all_dados', (arg)=>{
	addValorTabela(arg);
})
