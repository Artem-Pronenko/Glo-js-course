//
const out = document.querySelector('.out')
const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресение']
let thisDey = new Date().getDay()


if (thisDey - 1 === -1) thisDey = week.length - 1

week.forEach((item, i) => {
  if (thisDey === i) {
    out.innerHTML += `<b>${item}</b><br>`
  } else if (item === 'Суббота' || item === 'Воскресение') {
    out.innerHTML += `<i>${item}</i><br>`
  } else {
    out.innerHTML += `${item}<br>`
  }
})

