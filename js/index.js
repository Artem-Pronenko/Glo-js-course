const isNumber = n => !isNaN(parseFloat(n)) && isFinite(n),
  start = document.getElementById('start'),
  btnPlus = document.getElementsByTagName('button'),
  incomePlus = btnPlus[0],
  expensesPlus = btnPlus[1],
  depositCheck = document.querySelector('#deposit-check'),
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
  budgetMonthValue = document.querySelector('.budget_month-value'),
  budgetDayValue = document.querySelector('.budget_day-value'),
  expensesMonthValue = document.querySelector('.expenses_month-value'),
  additionalIncomeValue = document.querySelector('.additional_income-value'),
  additionalExpensesValue = document.querySelector('.additional_expenses-value'),
  incomePeriodValue = document.querySelector('.income_period-value'),
  targetMonthValue = document.querySelector('.target_month-value'),
  salaryAmount = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelector('.income-title'),
  incomeAmount = document.querySelector('.income-amount'),
  expensesTitle = document.querySelector('.expenses-title'),
  expensesAmount = document.querySelector('.expenses-amount'),
  additionalExpenses = document.querySelector('.additional_expenses-item'),
  periodSelect = document.querySelector('.period-select'),
  targetAmount = document.querySelector('.target-amount');

let money = null
const _start = () => {
  do {
    money = prompt('Ваш месячный доход?')
  }
  while (!isNumber(money))

}
_start()

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
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 10000,
  period: 3,

  asking() {

    if (confirm('У вас есть доп. заработок?')) {
      let itemIncome, cashIncome
      do {
        itemIncome = prompt('Какой у вас доп. заработок?', 'детдом').trim()
      }
      while (itemIncome === '' || isNumber(itemIncome))
      do {
        cashIncome = prompt('Сколько в месяц зарабатываете?', '1000').trim()
      }
      while (!isNumber(cashIncome))
      this.income[itemIncome] = +cashIncome
    }

    let addExpenses = ''
    do {
      addExpenses =
        prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'интернет, такси,' +
          ' коммунальные расходы')
          .trim()
    }
    while (addExpenses === '' || isNumber(addExpenses))
    appData.addExpenses = addExpenses.toLowerCase().split(',')

    // вывод массива с большой буквы
    let expenses = appData.addExpenses.map(el => el.trim()[0].toUpperCase() + el.trim().substring(1))
    console.log(expenses)


    appData.deposit = confirm('Есть ли у вас депозит в банке?')
    let sum = 0, newSum = 0
    for (let i = 0; i < 2; i++) {
      do {
        newSum = prompt('Введите обязательную статью расходов?', 'садик, чай').trim()
      }
      while (newSum === '' || isNumber(newSum))

      do {
        sum = prompt('Во сколько это обойдется?', '2000')
      }
      while (!isNumber(sum))
      appData.expenses[newSum] = +sum
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
  },

  getInfoDeposit() {
    if (this.deposit) {
      do {
        this.percentDeposit = prompt('Какой годовой процент?', '10').trim()
      }
      while (!isNumber(this.percentDeposit))
      this.percentDeposit = +this.percentDeposit
      do {
        this.moneyDeposit = prompt('Какая сумма заложена?', '1000').trim()
      }
      while (!isNumber(this.moneyDeposit))
      this.moneyDeposit = +this.moneyDeposit
    }
  },

  calcSavedMoney() {
    return this.budgetMonth * this.period
  },


}

appData.asking()
appData.getExpensesMonth()
appData.getBudget()
console.log('сумма всех обязательных расходов за месяц', appData.expensesMonth)
console.log('Накопления за месяц:', appData.budgetMonth)
console.log('Бюджет на день:', appData.budgetDay)

const targetMonth = appData.getTargetMonth()
if (targetMonth <= 0) {
  console.log('Цель не будет достигнута')
} else {
  console.log(`Цель будт достигнута за ${targetMonth} месяца`)
}
console.log(appData.getStatusIncome())

for (const key in appData) {
  console.log(`Наша программа включает в себя данные: ${key} ${appData[key]}`)

}
appData.getInfoDeposit()
console.log(appData.percentDeposit + '%', appData.moneyDeposit, appData.calcSavedMoney())