const todoControl = document.querySelector('.todo-control')
const headerInput = document.querySelector('.header-input')
const todoList = document.querySelector('.todo-list')
const todoCompleted = document.querySelector('.todo-completed')

let todoData = []
const dataUpdateStorage = () => localStorage.setItem('localData', JSON.stringify(todoData))

const createData = e => {
  e.preventDefault()
  if (headerInput.value.trim() === '') return
  const newTodo = {value: headerInput.value, completed: false}
  todoData.push(newTodo)
  dataUpdateStorage()
  render()
  headerInput.value = ''
}

const render = () => {
  todoList.textContent = ''
  todoCompleted.textContent = ''
  todoData.forEach((item, i, a) => {
    const li = document.createElement('li')
    li.classList.add('todo-item')
    li.innerHTML = `
      <span class="text-todo">${item.value}</span>
			<div class="todo-buttons">
				<button class="todo-remove"></button>
				<button class="todo-complete"></button>
			</div>
    `
    item.completed
      ? todoCompleted.append(li)
      : todoList.append(li)

    const btnTodoCompleted = li.querySelector('.todo-complete')
    const btnTodoDeleted = li.querySelector('.todo-remove')

    btnTodoCompleted.addEventListener('click', () => {
      item.completed = !item.completed
      dataUpdateStorage()
      render()
    })

    btnTodoDeleted.addEventListener('click', () => {
      todoData.splice(i, 1)
      btnTodoDeleted.parentElement.parentElement.remove()
      dataUpdateStorage()
      render()
    })

  })
}

if (localStorage.getItem('localData')) {
  todoData = [...JSON.parse(localStorage.getItem('localData'))]
  render()
}

todoControl.addEventListener('submit', createData)
