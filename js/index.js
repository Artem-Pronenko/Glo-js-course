const isNumber = n => !isNaN(parseFloat(n)) && isFinite(n),
  start = document.getElementById('start'),
  btnCancel = document.getElementById('cancel'),
  btnPlus = document.getElementsByTagName('button'),
  incomePlus = btnPlus[0],
  expensesPlus = btnPlus[1],
  depositCheck = document.querySelector('#deposit-check'),
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
  budgetMonthValue = document.querySelector('.budget_month-value'),
  budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
  expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
  additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
  additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
  incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
  targetMonthValue = document.getElementsByClassName('target_month-value')[0],
  salaryAmount = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelector('.income-title'),
  expensesTitle = document.querySelector('.expenses-title'),
  additionalExpenses = document.querySelector('.additional_expenses-item'),
  periodSelect = document.querySelector('.period-select'),
  targetAmount = document.querySelector('.target-amount'),
  dataBlockInput = document.querySelector('.data'),
  outPeriod = periodSelect.parentNode.children[2]

let expensesItems = document.querySelectorAll('.expenses-items'),
  incomeItems = document.querySelectorAll('.income-items')

const appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,

  start() {
    //Блокировка инпутов
    dataBlockInput.querySelectorAll('[type="text"]').forEach(item => item.disabled = true)
    start.style.display = 'none'
    btnCancel.style.display = 'block'
    this.budget = +salaryAmount.value
    this.getExpenses()
    this.getIncome()
    this.getExpensesMonth()
    this.getAddExpenses()
    this.getAddIncome()
    this.getBudget()

    this.showResult()
    this.incomeMonth = 0
    this.addIncome = []
    this.addExpenses = []
  },

  //Блокировка кнопки, если поле "Месячный доход" невалидно
  validStart: () => {
    start.disabled = !isNumber(salaryAmount.value);
  },

  addInputClear($el) {
    $el.children[0].value = ''
    $el.children[1].value = ''
  },

  // Добавление полей "Дополнительный доход"
  addIncomeBlock() {
    let cloneIncomeItems = incomeItems[0].cloneNode(true)
    this.addInputClear(cloneIncomeItems)
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus)
    incomeItems = document.querySelectorAll('.income-items')
    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none'
    }
  },

  // Добавление полей "Обязательные расходы"
  addExpensesBlock() {
    const cloneExpensesItems = expensesItems[0].cloneNode(true)
    this.addInputClear(cloneExpensesItems)
    expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesPlus)
    expensesItems = document.querySelectorAll('.expenses-items')
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none'
    }
  },

  // Результаты вычеслений
  showResult() {
    budgetMonthValue.value = this.budgetMonth
    budgetDayValue.value = this.budgetDay
    expensesMonthValue.value = this.expensesMonth
    additionalExpensesValue.value = this.addExpenses.join(', ')
    additionalIncomeValue.value = this.addIncome.join(', ')
    targetMonthValue.value = this.getTargetMonth()
    incomePeriodValue.value = this.calcPeriod()

    periodSelect.addEventListener('input', () => {
      incomePeriodValue.value = appData.calcPeriod()
    })

  },

  //Обязательные расходы
  getExpenses() {
    expensesItems.forEach(item => {
      const itemExpenses = item.querySelector('.expenses-title').value,
        cashExpenses = item.querySelector('.expenses-amount').value
      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = +cashExpenses
      }
    })
  },

  // Дополнительный доход
  getIncome() {
    incomeItems.forEach(item => {
      const itemIncome = item.querySelector('.income-title').value,
        cashIncome = item.querySelector('.income-amount').value

      if (itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome] = +cashIncome
      }
    })

    for (let key in this.income) {
      this.incomeMonth += +this.income[key]
    }

  },
  // Возможные расходы
  getAddExpenses() {
    let addExpenses = additionalExpenses.value.split(',')
    addExpenses.forEach(item => {
      item = item.trim()
      if (item !== '') {
        this.addExpenses.push(item)
      }
    })

  },

  getAddIncome() {
    additionalIncomeItem.forEach(item => {
      let itemValue = item.value.trim()
      if (item.value !== '') {
        this.addIncome.push(itemValue)
      }
    })
  },

  getExpensesMonth() {
    for (const key in this.expenses) {
      this.expensesMonth = +this.expenses[key]
    }
  },

  getBudget() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth
    this.budgetDay = Math.floor(this.budgetMonth / 30)
  },

  getTargetMonth() {
    return Math.ceil(targetAmount.value / this.budgetMonth)
  },

  calcPeriod() {
    return this.budgetMonth * periodSelect.value
  },

  // вывод "Период расчета"
  showPeriod() {
    const outPeriod = periodSelect.parentNode.children[2]
    outPeriod.textContent = periodSelect.value
  },
  // Валидация инпутов
  validateInput: () => {
    let dataBlockInput = document.querySelector('.data')
    dataBlockInput.addEventListener('input', event => {
      const {target} = event
      if (target.placeholder === 'Наименование') {
        target.value = target.value.replace(/[^а-я ,.]/i, '')
      }
      if (target.placeholder === 'Сумма') {
        target.value = target.value.replace(/[^0-9]/i, '')
      }
    })
  },

  deleteBtnPlus(item) {
    if (item.length > 1) {
      for (let i = item.length; i-- - 1;) {
        item[i].remove()
      }
    }
  },

  reset() {
    btnCancel.style.display = 'none'
    start.style.display = 'block'
    expensesPlus.style.display = 'block'
    incomePlus.style.display = 'block'

    this.deleteBtnPlus(expensesItems)
    this.deleteBtnPlus(incomeItems)


    // Очистка инпутов
    document.querySelectorAll('[type="text"]').forEach(item => item.value = '')
    dataBlockInput
      .querySelectorAll('[type="text"]')
      .forEach(item => item.disabled = false)
    // Период расчета сброс
    outPeriod.textContent = '1'
    periodSelect.value = 1
    // Сброс данных объекта
    this.income = {}
    this.incomeMonth = 0
    this.addIncome = []
    this.expenses = {}
    this.addExpenses = []
    this.deposit = false
    this.percentDeposit = 0
    this.moneyDeposit = 0
    this.budget = 0
    this.budgetDay = 0
    this.budgetMonth = 0
    this.expensesMonth = 0
    this.validStart()

  }

}

appData.validateInput()
appData.validStart()
start.addEventListener('click', appData.start.bind(appData))

expensesPlus.addEventListener('click', appData.addExpensesBlock.bind(appData))
incomePlus.addEventListener('click', appData.addIncomeBlock.bind(appData))
periodSelect.addEventListener('input', appData.showPeriod)
salaryAmount.addEventListener('input', appData.validStart)
btnCancel.addEventListener('click', appData.reset.bind(appData))
