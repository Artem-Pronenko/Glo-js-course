//
const myClock = () => {
  const data = new Date(),
    dataYear = data.getFullYear(),
    dataHours = data.getHours(),
    dataMinutes = data.getMinutes(),
    dataSeconds = data.getSeconds(),
    out = document.querySelector('.out'),
    declOfNum = (n, t) => t[(n % 100 > 4 && n % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(n % 10 < 5) ? n % 10 : 5]]

  const timer = arr => {
    const [dataHours, dataMinutes, dataSeconds] = arr,
      hours = ['час', 'часа', 'часов'],
      minutes = ['минута', 'минуты', 'минут'],
      seconds = ['секунда', 'секунды', 'секунд']
    out.textContent = `Сегодня ${data.toLocaleString('ru', {
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    })} ${dataYear} года, ${dataHours + ' ' + declOfNum(dataHours, hours)}
	${dataMinutes + ' ' + declOfNum(dataMinutes, minutes)} ${dataSeconds + ' ' + declOfNum(dataSeconds, seconds)}`

  }
  timer([dataHours, dataMinutes, dataSeconds])

}
myClock()
setInterval(myClock, 1000)

//
const myTimer2 = () => {
  const data = new Date(),
    out2 = document.querySelector('.out2')
  out2.textContent = data.toLocaleString('ru')
}

myTimer2()
setInterval(myTimer2, 1000)

//
const myTimer3 = () => {
  const data = new Date(),
    newObj = {
      dataYear: data.getFullYear(),
      dataHours: data.getHours(),
      dataMinutes: data.getMinutes(),
      dataSeconds: data.getSeconds(),
      dataDate: data.getDate(),
      dataMonth: data.getMonth() + 1,
      out3: document.querySelector('.out3'),
      addNull: '0'
    }
  for (const key in newObj) {
    if (newObj[key].toString().length < 2) {
      newObj[key] = newObj.addNull + newObj[key] + ''
      newObj.out3.textContent = `${newObj.dataDate}.${newObj.dataMonth}.${newObj.dataYear} - ${newObj.dataHours}:${newObj.dataMinutes}:${newObj.dataSeconds}`
    }
  }
}
myTimer3()
setInterval(myTimer3, 1000)
