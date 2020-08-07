let money, income, addExpenses, deposit, mission, period

// Все что угодно только давате без запрета ";" в коде. это всего лишь рекомендация

// ДЗ 01
//window.alert('любой текст')
//console.log(money || 'денег нет(')

// ДЗ 02
money = 7000
income = 'Web-start'
addExpenses = ' Лицензия на WebStorm , Микрофон, Интернет '
deposit = false
mission = 10000
period = 3

console.log(typeof money)
console.log(typeof income)
console.log(typeof deposit)
console.log('длина строки ' + addExpenses.length)
console.log(`Период равен ${period} месяцев`)
console.log(`Цель заработать ${mission} рублей`)

console.log(addExpenses.toLowerCase().trim().split(' , '))

let budgetDay = money / 30
console.log(Math.floor(budgetDay * 100) / 100)



