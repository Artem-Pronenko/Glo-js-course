const isNumber = n => !isNaN(parseFloat(n)) && isFinite(n)

let money = null
const start = () => {
  do {
    money = prompt('Ваш месячный доход?')
  }
  while (!isNumber(money))

}
start()

const appData = {
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 10000,
  period: 3,

  asking() {
    const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', ' Лицензия на' +
      ' WebStorm , Микрофон, Интернет ')
    this.addExpenses = addExpenses.toLowerCase().trim().split(' , ')
    this.deposit = confirm('Есть ли у вас депозит в банке?')

    let sum, costItem
    for (let i = 0; i < 2; i++) {
      costItem = prompt('Введите обязательную статью расходов?', 'Интернет')
      do {
        sum = prompt('Во сколько это обойдется?', '500')
      } while (!isNumber(sum))
      this.expenses[costItem] = +sum
    }
  },

  getExpensesMonth() {
    for (const key in this.expenses) {
      this.expensesMonth += +this.expenses[key]
    }
  },

  getBudget() {
    this.budgetMonth = this.budget - this.expensesMonth
    this.budgetDay = Math.floor(this.budgetMonth / 30)
  },

  getTargetMonth() {
    return Math.ceil(this.mission / this.budgetMonth)
  },

  getStatusIncome() {
    const budget = this.budgetDay
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

}

appData.asking()
appData.getExpensesMonth()
appData.getBudget()
console.log('сумма всех обязательных расходов за месяц', appData.expensesMonth)
console.log('Накопления за месяц:', appData.budgetMonth)
console.log('Бюджет на день:', appData.budgetDay)

const targetMonth = appData.getTargetMonth();
if (targetMonth <= 0) {
  console.log('Цель не будет достигнута');
} else {
  console.log(`Цель будт достигнута за ${targetMonth} месяца`);
}
console.log(appData.getStatusIncome())

for (const key in appData) {
  console.log(`Наша программа включает в себя данные: ${key} ${appData[key]}`);

}
