function getColors(queryString) {
	fetch(`https://www.thecolorapi.com/scheme?count=4&${queryString}`)
		.then(response => response.json())
		.then(data => {
			const colorsHtml = data.colors.map((color) => color.hex.value)
			const seed = data.seed.hex.value
			colorsHtml.unshift(seed)
			document.getElementById('color-sect').innerHTML = getColorsHtml(colorsHtml)
			updateBackgroundColor()
		})
}

function getColorsHtml(colorsArray) {
	return colorsArray.map(color => {
		return `
		<div class="color-group">
			<div class="color" data-color=${color}></div>
			<p class="code">${color}</p>
		</div>
		`
	}).join("")
}

function updateBackgroundColor() {
	const colorBars = document.getElementById('color-sect').querySelectorAll('.color')
	colorBars.forEach(bar => {
		bar.addEventListener('click', () => {
			navigator.clipboard.writeText(bar.dataset.color)
		})
		bar.style.backgroundColor = bar.dataset.color
	})
}

document.getElementById('form').addEventListener('submit', (e) => {
	e.preventDefault()
	const picker = document.getElementById('color-picker').value
	const mode = document.getElementById('color-mode').value
	const queryString = `hex=${picker.slice(1,)}&mode=${mode}`
	getColors(queryString)
})

