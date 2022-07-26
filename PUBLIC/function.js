function addValorTabela(arg){
	function valores(max,n){
		let valor=[];
		for (let x=0; x < max ; x++){
			valor.push(arg[x].split(',')[n])
		}
		return valor
	}
	function dataHora(max){
		let datahora = []
		for (let x=0; x < max; x++){
			datahora.push(arg[x].split(',')[0]+" | "+arg[x].split(',')[1])
		}
		return datahora
	}
	const labels =['temperatura', 'umidade do ar', 'pluviometro', 'luminosidade', 'umidade do solo']
	const ctx = document.querySelectorAll('#myChart');
	ctx.forEach((elemento,indice)=>{
			
		const data =new Chart(elemento.getContext('2d'),{
		type: "line",
		data: {
			labels: dataHora(max),
			datasets: [{
				label: labels[indice],
				data: valores(max,(indice+2)),
				fill: false,
				borderWidth: 1,
				borderColor: 'rgb(150, 0, 0)',
				pointRadius: 2,
				pointBorderWidth: 2,
				pointBackgroundColor: 'rgb(150, 0, 0)',
				pointHoverBorderWidth: 2,
				pointHoverRadius: 4,
				tension: 0
				}]
			},
		})
		elemento.getContext('2d').canvas.parentNode.style.width= "400px";
	})
}