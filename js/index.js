// гавноКод наше всё
const books = document.querySelector('.books'),
  book = document.querySelectorAll('.book'),
  li = document.createElement('li'),
  book2Ul = book[0].children[1],
  book2Li = book2Ul.children,
  book5Ul = book[5].children[1],
  book5Li = book5Ul.children

document.querySelector('.adv').remove()

books.appendChild(book[2])

books.insertBefore(book[1], book[0])
books.insertBefore(book[4], book[3])

document.body.style.backgroundImage = 'url(image/you-dont-know-js.jpg)'

book[4].children[0].children[0].textContent = 'Книга 3. this и Прототипы Объектов'

book2Ul.insertBefore(book2Li[2], book2Li[9])
book2Ul.insertBefore(book2Li[5], book2Li[3])
book2Ul.insertBefore(book2Li[7], book2Li[4])
book2Ul.insertBefore(book2Li[9], book2Li[8])

book5Ul.insertBefore(book5Li[9], book5Li[2])
book5Ul.insertBefore(book5Li[4], book5Li[3])
book5Ul.insertBefore(book5Li[5], book5Li[4])
book5Ul.insertBefore(book5Li[6], book5Li[9])

li.textContent = 'Глава 8: За пределами ES6'
book[2].children[1].append(li)

book[2].children[1].insertBefore(book[2].children[1].children[10], book[2].children[1].children[9])