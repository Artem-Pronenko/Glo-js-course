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

const AppData = function () {
  this.budget = 0
  this.budgetDay = 0
  this.budgetMonth = 0
  this.expensesMonth = 0
  this.income = {}
  this.incomeMonth = 0
  this.addIncome = []
  this.expenses = {}
  this.addExpenses = []
  this.deposit = false
  this.percentDeposit = 0
  this.moneyDeposit = 0
}

AppData.prototype.start = function () {
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
}


//Блокировка кнопки, если поле "Месячный доход" невалидно
AppData.prototype.validStart = function () {
  return start.disabled = !isNumber(salaryAmount.value)
}

AppData.prototype.addInputClear = function ($el) {
  $el.children[0].value = ''
  $el.children[1].value = ''
}

// Добавление полей "Дополнительный доход"
AppData.prototype.addIncomeBlock = function () {
  let cloneIncomeItems = incomeItems[0].cloneNode(true)
  this.addInputClear(cloneIncomeItems)
  incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus)
  incomeItems = document.querySelectorAll('.income-items')
  if (incomeItems.length === 3) {
    incomePlus.style.display = 'none'
  }
}

// Добавление полей "Обязательные расходы"
AppData.prototype.addExpensesBlock = function () {
  const cloneExpensesItems = expensesItems[0].cloneNode(true)
  this.addInputClear(cloneExpensesItems)
  expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesPlus)
  expensesItems = document.querySelectorAll('.expenses-items')
  if (expensesItems.length === 3) {
    expensesPlus.style.display = 'none'
  }
}

// Результаты вычеслений
AppData.prototype.showResult = function () {
  budgetMonthValue.value = this.budgetMonth
  budgetDayValue.value = this.budgetDay
  expensesMonthValue.value = this.expensesMonth
  additionalExpensesValue.value = this.addExpenses.join(', ')
  additionalIncomeValue.value = this.addIncome.join(', ')
  targetMonthValue.value = this.getTargetMonth()
  incomePeriodValue.value = this.calcPeriod()

  periodSelect.addEventListener('input', () => {
    incomePeriodValue.value = this.calcPeriod()
  })

}


//Обязательные расходы
AppData.prototype.getExpenses = function () {
  expensesItems.forEach(item => {
    const itemExpenses = item.querySelector('.expenses-title').value,
      cashExpenses = item.querySelector('.expenses-amount').value
    if (itemExpenses !== '' && cashExpenses !== '') {
      this.expenses[itemExpenses] = +cashExpenses
    }
  })
}


// Дополнительный доход
AppData.prototype.getIncome = function () {
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

}

// Возможные расходы
AppData.prototype.getAddExpenses = function () {
  let addExpenses = additionalExpenses.value.split(',')
  addExpenses.forEach(item => {
    item = item.trim()
    if (item !== '') {
      this.addExpenses.push(item)
    }
  })

}


AppData.prototype.getAddIncome = function () {
  additionalIncomeItem.forEach(item => {
    let itemValue = item.value.trim()
    if (item.value !== '') {
      this.addIncome.push(itemValue)
    }
  })
}


AppData.prototype.getExpensesMonth = function () {
  for (const key in this.expenses) {
    this.expensesMonth = +this.expenses[key]
  }
}


AppData.prototype.getBudget = function () {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth
  this.budgetDay = Math.floor(this.budgetMonth / 30)
}

AppData.prototype.getTargetMonth = function () {
  return Math.ceil(targetAmount.value / this.budgetMonth)
}

AppData.prototype.calcPeriod = function () {
  return this.budgetMonth * periodSelect.value
}

// вывод "Период расчета"
AppData.prototype.showPeriod = function () {
  const outPeriod = periodSelect.parentNode.children[2]
  outPeriod.textContent = periodSelect.value
}

// Валидация инпутов
AppData.prototype.validateInput = function () {
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
}

AppData.prototype.deleteBtnPlus = function (item) {
  if (item.length > 1) {
    for (let i = item.length; i-- - 1;) {
      item[i].remove()
    }
  }
}

AppData.prototype.reset = function () {
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

AppData.prototype.eventsListeners = function () {
  start.addEventListener('click', this.start.bind(this))
  expensesPlus.addEventListener('click', this.addExpensesBlock.bind(this))
  incomePlus.addEventListener('click', this.addIncomeBlock.bind(this))
  periodSelect.addEventListener('input', this.showPeriod)
  salaryAmount.addEventListener('input', this.validStart)
  btnCancel.addEventListener('click', this.reset.bind(this))
}

const appData = new AppData()
appData.validateInput()
appData.validStart()
appData.eventsListeners()
