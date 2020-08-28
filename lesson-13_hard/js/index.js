//
const h2 = document.querySelector('h2')
const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16)

document
  .querySelector('button')
  .addEventListener('click', () => {
  const color = randomColor()
  h2.textContent = `COLOR HEX: ${color}`
  document.body.style.backgroundColor = color
})