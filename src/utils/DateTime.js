export function DataTime() {
	let data = new Date()
	data.setTime(data.getTime() + -3 * 60 * 60 * 1000) //	3 horas => milisegundos -> segundos -> minutos -> horas
	let dia = ('0' + data.getDate()).slice(-2)
	let mes = ('0' + (data.getMonth() + 1)).slice(-2)
	let ano = data.getFullYear()
	let hora = data.getHours()
	let minutos = data.getMinutes()
	let segundo = data.getSeconds()

	return `\n${dia}/${mes}/${ano},${hora}:${minutos}:${segundo}`
}
