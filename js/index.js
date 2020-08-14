const isNumber = n => !isNaN(parseFloat(n)) && isFinite(n)

let money,
  income = 'Web-start',
  addExpenses = ' Лицензия на WebStorm , Микрофон, Интернет ',
  deposit = false,
  mission = 10000,
  period = 3

const start = () => {
  do {
    money = prompt('Ваш месячный доход?')
  }
  while (!isNumber(money))

}
start()

const showTypeOf = data => console.log(data, typeof (data))

showTypeOf(money)
showTypeOf(income)
showTypeOf(deposit)


addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', ' Лицензия на WebStorm , Микрофон, Интернет ')
deposit = confirm('Есть ли у вас депозит в банке?')

let expenses = []
const getExpensesMonth = () => {
  let sum = 0
  let countSum = 0
  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt('Введите обязательную статью расходов?', 'Интернет')
    do {
      countSum = prompt('Во сколько это обойдется?', '500')
    } while (!isNumber(countSum))
    sum += +countSum
  }

  return sum
}

let expensesAmount = getExpensesMonth()

console.log('Расходы за месяц:', expensesAmount)

const getAccumulatedMonth = () => money - expensesAmount
console.log('Бюджет на месяц:', getAccumulatedMonth())

const accumulatedMonth = getAccumulatedMonth()

const getTargetMonth = () => Math.ceil(mission / accumulatedMonth)

getTargetMonth() <= 0
  ? console.log('цель не будет достигнута')
  : console.log(`Цель будет достигнута за: ${getTargetMonth()} месяцев`)


const budgetDay = () => Math.floor(accumulatedMonth / 30)
console.log('Бюджет на день:', budgetDay())

console.log(addExpenses.toLowerCase().trim().split(' , '))

const getStatusIncome = () => {
  const budget = budgetDay()
  if (!budget || budget < 0) {
    return 'Что-то пошло не так';
  } else if (budget >= 1200) {
    return 'У вас высокий уровень дохода';
  } else if (budget >= 600 && budget < 1200) {
    return 'У вас средний уровень дохода';
  } else {
    return 'К сожалению у вас уровень дохода ниже среднего';
  }
}
console.log(getStatusIncome())