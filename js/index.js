const DomElement = function (selector, height, width, bg, fontSize) {
  this.selector = selector
  this.height = height
  this.width = width
  this.bg = bg
  this.fontSize = fontSize
}

DomElement.prototype.myCreateElement = function (text) {
  let element
  if (this.selector[0] === '.') {
    element = document.createElement('div')
    element.classList.add(this.selector.slice(1))
  } else if (this.selector[0] === '#') {
    element = document.createElement('p')
    element.setAttribute('id', this.selector.slice(1))
  }

  element.style.cssText = `
		height: ${this.height}px;
		width: ${this.width}px;
		background-color: ${this.bg};
		font-size: ${this.fontSize}px;
	`
  element.textContent = text
  document.body.append(element)
}

const domElement = new DomElement('.id', 100, 100, 'red', 14)
// Что это значит? вообще непонимаю. Зачем этот пункт
//2) Создать новый объект на основе класса DomElement
const createDomEl = domElement.myCreateElement('text')