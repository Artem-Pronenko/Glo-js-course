let money = 7000,
  income = 'Web-start',
  addExpenses = ' Лицензия на WebStorm , Микрофон, Интернет ',
  deposit = false,
  mission = 10000,
  period = 3


const showTypeOf = data => console.log(data, typeof (data))

showTypeOf(money)
showTypeOf(income)
showTypeOf(deposit)


money = +prompt('Ваш месячный доход?', '7000')
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', ' Лицензия на WebStorm , Микрофон, Интернет ')
deposit = confirm('Есть ли у вас депозит в банке?')

expenses1 = prompt('Введите обязательную статью расходов?', 'Интернет')
amount1 = +prompt('Во сколько это обойдется?', '500')

expenses2 = prompt('Введите обязательную статью расходов?', 'Интернет2')
amount2 = +prompt('Во сколько это обойдется?', '500')


const getExpensesMonth = () => amount1 + amount2
console.log('Расходы за месяц:', getExpensesMonth())

const getAccumulatedMonth = () => money - getExpensesMonth()
console.log('Бюджет на месяц:', getAccumulatedMonth())

const accumulatedMonth = getAccumulatedMonth()

const getTargetMonth = () => Math.ceil(mission / accumulatedMonth)
console.log(`Цель будет достигнута за: ${getTargetMonth()} месяцев`)

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