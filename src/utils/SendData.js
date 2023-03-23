// import { dados } from "../../index.js";

export function SendDados(data) {
	let return_dado = []

	// data = data.split('\n');
	// console.log(data)
	const lenght = data.length < 500 ? data.length : 500
	for (let x = 0; x < lenght; x++) {
		//pegar 500 ultimos itens
		return_dado.push(data[data.length - 1 - x])
	}
	return return_dado
}
