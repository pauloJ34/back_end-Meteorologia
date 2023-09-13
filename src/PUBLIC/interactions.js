const toggleBT = document.querySelector('.button-toggle')
const toggleGraphics = document.querySelector('.contain_graficos')

toggleBT.onclick = (e) => {
	// toggleBT.innerText = toggleBT.innerText === '<' ? '>' : '<'
	toggleGraphics.classList.remove('full-screen')
	toggleBT.classList.remove('visible')
}

const bt_select = document.querySelectorAll('.bt-graphics-select')
const graphics = document.querySelectorAll('.graficos')

for (const index in bt_select){
	bt_select[index].onclick = (e) => { 
		for(const bt of bt_select){
			bt.classList.remove("selected")
		}
		for(const gp of graphics){
			gp.classList.remove("visible-gb")
		}
		bt_select[index].classList.add('selected')
		graphics[index].classList.add('visible-gb')
		toggleGraphics.classList.add('full-screen')
		toggleBT.classList.add('visible')
	}
	
}