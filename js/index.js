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
// УРОК №3
console.log('УРОК №3-------------------------------------------')

money = +prompt('Ваш месячный доход?', '7000')
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', ' Лицензия на WebStorm , Микрофон, Интернет ')
deposit = confirm('Есть ли у вас депозит в банке?')

expenses1 = prompt('Введите обязательную статью расходов?', 'Интернет')
amount1 = +prompt('Во сколько это обойдется?', '500')

expenses2 = prompt('Введите обязательную статью расходов?', 'Интернет2')
amount2 = +prompt('Во сколько это обойдется?', '500')

let budgetMonth = money - (amount1 + amount2)
console.log('Бюджет на месяц: ' + budgetMonth)
let achieved = Math.ceil(mission / budgetMonth)
console.log(`Цель будет достигнута за: ${achieved} месяцев`)

budgetDay = Math.floor(budgetMonth / 30)
console.log('Бюджет на день: ' + budgetDay)

if (!budgetDay || budgetDay < 0) {
  console.log('Что-то пошло не так')
} else if (budgetDay >= 1200) {
  console.log('У вас высокий уровень дохода')
} else if (budgetDay >= 600 && budgetDay < 1200) {
  console.log('У вас средний уровень дохода')
} else {
  console.log('К сожалению у вас уровень дохода ниже среднего')
}

