// import { dados } from "../../index.js";

export function SendDados (somente_dados){
	let return_dado=[];
  
  // somente_dados = somente_dados.split('\n');
  // console.log(somente_dados)
	const lenght = (somente_dados.length<500)? somente_dados.length : 500
	for(let x = 0; x<lenght ; x++){	//pegar 500 ultimos itens
		return_dado.push(somente_dados[(somente_dados.length-1)-x]);
	}
	return return_dado;
}