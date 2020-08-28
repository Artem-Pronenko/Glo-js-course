// убрал лишнее из обязательного ДЗ. особо ничего не изменилось. просто код чище стал
const DomElement = function (selector, height, width, bg, text, step) {
  this.selector = selector
  this.height = height
  this.width = width
  this.bg = bg
  this.text = text
  this.defaultStep = step
  this.step = step
  this.y = 0
  this.x = 0
}

DomElement.prototype.myCreateElement = function (element = null) {
  this.element = element

  if (this.selector[0] === '.') {
    this.element = document.createElement('div')
    this.element.classList.add(this.selector.slice(1))
  } else if (this.selector[0] === '#') {
    this.element = document.createElement('p')
    this.element.setAttribute('id', this.selector.slice(1))
  }

  this.element.style.cssText = `
			height: ${this.height}px;
			width: ${this.width}px;
			background-color: ${this.bg};
			position: absolute;
		`
  this.element.textContent = this.text

  document.body.append(this.element)
}

// чеоез сет тайм аут можно было сделать в 60 фпс движения. но не при отставании на 4 урока
DomElement.prototype.traffic = function ({code, shiftKey}) {

  const elPos = this.element.getBoundingClientRect(),
    screen = document.body.getBoundingClientRect()

  shiftKey
    ? this.step = 45
    : this.step = this.defaultStep

  // движение + запрет выхода за края экрана
  switch (code) {
    case 'ArrowUp':
      elPos.top > screen.top ? this.y -= this.step : false
      break
    case 'ArrowDown' :
      elPos.top < screen.bottom - this.height - 7 ? this.y += this.step : false
      break
    case 'ArrowLeft' :
      elPos.left > screen.left ? this.x -= this.step : false
      break
    case 'ArrowRight' :
      elPos.left < screen.right - this.width - 7 ? this.x += this.step : false
      break
  }

  this.element.style.cssText += `
			top: ${this.y}px;
			left: ${this.x}px;
		`

}

const domElement = new DomElement('.id', 100, 100, 'red', 'Зажать shift чтобы двигатся быстрее', 10)

domElement.myCreateElement()
document.addEventListener('keydown', domElement.traffic.bind(domElement))

const domElement2 = new DomElement('.id', 100, 100, 'green', 'Зажать shift чтобы двигатся быстрее', 20)
domElement2.myCreateElement()
document.addEventListener('keydown', domElement2.traffic.bind(domElement2))