let max = 10
const socket = io.connect('/')
const variables = [
	document.querySelector('#data'),
	document.querySelector('#hora'),
	document.querySelector('#fild1'),
	document.querySelector('#fild2'),
	document.querySelector('#fild3'),
	document.querySelector('#fild4'),
	document.querySelector('#fild5'),
]
socket.on('dados_recebidos', (arg) => {
	arg = arg.split(',')
	// console.log(arg)
	arg.forEach((key, id) => {
		key = key.replace('\n', '')
		variables[id].innerText = key
	})
})
socket.on('all_dados', (arg) => {
	// console.log(arg)
	addValueTable(arg)
})
