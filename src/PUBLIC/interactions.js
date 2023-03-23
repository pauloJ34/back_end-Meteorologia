const toggleBT = document.querySelector('.button-toggle')
const toggleGraphics = document.querySelector('.contain_graficos')

toggleBT.onclick = (e) => {
	toggleBT.innerText = toggleBT.innerText === '<' ? '>' : '<'
	toggleGraphics.classList.toggle('full-screen')
}
