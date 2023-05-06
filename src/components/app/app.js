import React from 'react'

import NewTaskForm from '../new-task-form/new-task-form.js'
import TodoList from '../todo-list/todo-list.js'
import Footer from '../footer/footer.js'
const completedTaskCssClass = 'completed'
const filterButtonsNames = {
  all: 'All',
  active: 'Active',
  completed: 'Completed',
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.userMaxId = 1000
    this.state = {
      tasks: [
        {
          id: this.userMaxId++,
          previousClassName: '',
          className: 'completed',
          description: 'First',
          created: new Date(2023, 3, 28, 12),
          editing: false,
        },
        {
          id: this.userMaxId++,
          previousClassName: '',
          className: '',
          description: 'Second',
          created: new Date(2023, 3, 30, 9),
          editing: false,
        },
        {
          id: this.userMaxId++,
          previousClassName: '',
          className: '',
          description: 'Third',
          created: new Date(2023, 4, 1, 19),
          editing: false,
        },
      ],
      filterButtons: [
        {
          id: 1,
          className: 'selected',
          buttonText: 'All',
        },
        {
          id: 2,
          className: '',
          buttonText: 'Active',
        },
        {
          id: 3,
          className: '',
          buttonText: 'Completed',
        },
      ],
      inputValue: '',
    }
    this.onToggleCompleted = (evt) => {
      const taskInputElement = evt.target
      let newClassName = ''
      if (taskInputElement.checked) {
        newClassName = completedTaskCssClass
      }
      this.setState(({ tasks }) => {
        const taskIndex = tasks.findIndex((task) => task.id === Number(taskInputElement.closest('li').dataset.id))
        const newTasks = [...tasks]
        newTasks[taskIndex].className = newClassName
        return {
          tasks: newTasks,
        }
      })
    }
    this.deleteItem = (evt) => {
      const deleteButtonElement = evt.target
      this.setState(({ tasks }) => {
        const taskIndex = tasks.findIndex((task) => task.id === Number(deleteButtonElement.closest('li').dataset.id))
        const newTasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)]
        return {
          tasks: newTasks,
        }
      })
    }
    this.addItem = (text) => {
      const newTask = {
        id: this.userMaxId++,
        className: '',
        description: text,
        created: new Date(),
        editing: false,
      }
      this.setState(({ tasks }) => {
        const newTasks = [...tasks, newTask]
        return {
          tasks: newTasks,
        }
      })
    }
    this.onInputChange = (evt) => {
      this.setState({
        inputValue: evt.target.value,
      })
    }
    this.onSubmit = (evt) => {
      evt.preventDefault()
      const value = this.state.inputValue.trim()
      if (value) {
        this.addItem(value)
        this.setState(() => {
          return {
            inputValue: '',
          }
        })
        this.changeFilterButtonClass(filterButtonsNames.all)
      }
    }
    this.changeFilterButtonClass = (target) => {
      this.setState(({ filterButtons }) => {
        const newFilteredButtons = filterButtons.map((button) => {
          if (target === button.buttonText) {
            button.className = 'selected'
            return button
          }
          button.className = ''
          return button
        })
        return {
          filterButtons: newFilteredButtons,
        }
      })
    }
    this.onFilterButtonClick = (evt) => {
      const targetButtonName = evt.target.dataset.buttonName
      this.changeFilterButtonClass(targetButtonName)
    }
    this.deleteAllCompletedTasks = () => {
      this.setState(({ tasks }) => {
        const newTasks = tasks.filter((task) => task.className !== completedTaskCssClass)
        return {
          tasks: newTasks,
        }
      })
    }
    this.onEditButtonClick = (evt) => {
      const editButtonElement = evt.target
      this.setState(({ tasks }) => {
        const taskIndex = tasks.findIndex((task) => task.id === Number(editButtonElement.closest('li').dataset.id))
        tasks[taskIndex] = {
          ...tasks[taskIndex],
          previousClassName: tasks[taskIndex].className,
          className: 'editing',
          editing: true,
        }
        const updatedTask = tasks[taskIndex]
        const newTasks = [...tasks.slice(0, taskIndex), updatedTask, ...tasks.slice(taskIndex + 1)]
        return {
          tasks: newTasks,
        }
      })
    }
    this.onEditFieldEnterKeyDown = (evt) => {
      //TODO add escape key action
      if (evt.key === 'Enter') {
        const editField = evt.target
        const newValue = editField.value.trim()
        if (!newValue) {
          return
        }
        this.setState(({ tasks }) => {
          const taskIndex = tasks.findIndex((task) => task.id === Number(editField.closest('li').dataset.id))
          tasks[taskIndex] = {
            ...tasks[taskIndex],
            className: tasks[taskIndex].previousClassName,
            previousClassName: '',
            editing: false,
            description: newValue,
          }
          const updatedTask = tasks[taskIndex]
          const newTasks = [...tasks.slice(0, taskIndex), updatedTask, ...tasks.slice(taskIndex + 1)]
          return {
            tasks: newTasks,
          }
        })
      }
    }
  }

  render() {
    const { tasks } = this.state
    const countActiveTasks = tasks.filter((task) => task.className !== completedTaskCssClass).length
    return (
      <section className="todoapp">
        <header className="header">
          <h1>Todos</h1>
          <NewTaskForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} inputValue={this.state.inputValue} />
        </header>
        <section className="main">
          <TodoList
            tasks={tasks}
            onToggleCompleted={this.onToggleCompleted}
            onDelete={this.deleteItem}
            onEditButtonClick={this.onEditButtonClick}
            onEditFieldEnterKeyDown={this.onEditFieldEnterKeyDown}
            filterButtons={this.state.filterButtons}
          />
          <Footer
            countActiveTasks={countActiveTasks}
            filterButtons={this.state.filterButtons}
            onFilterButtonClick={this.onFilterButtonClick}
            deleteAllCompletedTasks={this.deleteAllCompletedTasks}
          />
        </section>
      </section>
    )
  }
}
