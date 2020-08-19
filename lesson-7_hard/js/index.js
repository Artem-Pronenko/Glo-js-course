//
const out = document.querySelector('.out')
const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресение']
let thisDay = new Date().getDay()


if (thisDay - 1 === -1) thisDay = week.length - 1

week.forEach((item, i) => {
  if (thisDay - 1 === i) {
    out.innerHTML += `<b>${item}</b><br>`
  } else if (item === 'Суббота' || item === 'Воскресение') {
    out.innerHTML += `<i>${item}</i><br>`
  } else {
    out.innerHTML += `${item}<br>`
  }
})

