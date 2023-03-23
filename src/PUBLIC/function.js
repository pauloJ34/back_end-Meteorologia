function addValueTable(arg) {
	function values(max, n) {
		let valor = []
		for (let x = 0; x < max; x++) {
			valor.push(arg[x].split(',')[n])
		}
		return valor
	}
	function dataTime(max) {
		let data_time = []
		for (let x = 0; x < max; x++) {
			// data_time.push(arg[x].split(',')[0] + ' | ' + arg[x].split(',')[1])
			data_time.push(
				arg[x].split(',')[0].split('/').splice(0, 2).join('/') +
					'-' +
					arg[x].split(',')[1].split(':').splice(0, 2).join(':')
			)
		}
		return data_time
	}
	dataTime(max)
	const labels = [
		'temperatura',
		'umidade do ar',
		'pluviometro',
		'luminosidade',
		'umidade do solo',
	]
	const ctx = document.querySelectorAll('#myChart')
	ctx.forEach((element, index) => {
		// console.log(arg)
		let chartStatus = Chart.getChart(element) // <canvas> id
		if (chartStatus != undefined) {
			chartStatus.destroy()
		}
		Chart.defaults.font.size = 16;
		const data = new Chart(element.getContext('2d'), {
			type: 'line',
			data: {
				labels: dataTime(max).reverse(),
				// labels: ['','','','','','','','','',''],
				responsive: false,
				datasets: [
					{
						label: labels[index],
						data: values(max, index + 2).reverse(),
						fill: false,
						borderWidth: 1,
						borderColor: 'rgb(150, 0, 0)',
						pointRadius: 2,
						pointBorderWidth: 2,
						pointBackgroundColor: 'rgb(150, 0, 0)',
						pointHoverBorderWidth: 2,
						pointHoverRadius: 4,
						tension: 0,
					},
				],
			},
			options: {
				animation: false,
			},
		})
		
		//element.getContext('2d').canvas.parentNode.style.width= "400px";
		// element.getContext('2d').canvas.parentNode.style.height= "400px";
	})
	window.addEventListener('beforeprint', () => {
		ctx.resize(300, 300);
	});
	  window.addEventListener('afterprint', () => {
		ctx.resize();
	});
}
