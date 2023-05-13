import React from 'react'

import NewTaskForm from '../NewTaskForm/NewTaskForm.jsx'
import TaskList from '../TaskList/TaskList.jsx'
import Footer from '../Footer/Footer.jsx'

const filterButtonName = {
  ALL: 'All',
  ACTIVE: 'Active',
  COMPLETED: 'Completed',
}
const filterButtonClassName = {
  SELECTED: 'selected',
  NOT_SELECTED: '',
}
const eventKey = {
  ENTER: 'Enter',
  ESCAPE: 'Escape',
}
const taskStatusClassName = {
  ACTIVE: '',
  COMPLETED: 'completed',
  EDITING: 'editing',
  ENABLE_EDIT: 'edit',
}
const updateType = {
  START_EDITING: 'edit',
  CANCEL_EDITING: 'canselEditing',
  EDITED: 'edited',
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.userMaxId = 1000
    this.state = {
      tasks: [
        {
          id: this.userMaxId++,
          previousClassName: null,
          className: taskStatusClassName.COMPLETED,
          description: 'First',
          created: new Date(2023, 3, 28, 12),
          editing: false,
          minutes: 1,
          seconds: 1,
        },
        {
          id: this.userMaxId++,
          previousClassName: null,
          className: taskStatusClassName.ACTIVE,
          description: 'Second',
          created: new Date(2023, 3, 30, 9),
          editing: false,
          minutes: 0,
          seconds: 5,
        },
        {
          id: this.userMaxId++,
          previousClassName: null,
          className: taskStatusClassName.ACTIVE,
          description: 'Third',
          created: new Date(2023, 4, 1, 19),
          editing: false,
          minutes: 8,
          seconds: 8,
        },
      ],
      filterButtons: [
        {
          id: 1,
          className: filterButtonClassName.SELECTED,
          buttonText: filterButtonName.ALL,
        },
        {
          id: 2,
          className: filterButtonClassName.NOT_SELECTED,
          buttonText: filterButtonName.ACTIVE,
        },
        {
          id: 3,
          className: filterButtonClassName.NOT_SELECTED,
          buttonText: filterButtonName.COMPLETED,
        },
      ],
      inputTask: '',
      inputMinutes: '',
      inputSeconds: '',
    }
    this.updateTimerTime = (id, minutes, seconds) => {
      this.setState(({ tasks }) => {
        const taskIndex = tasks.findIndex((task) => task.id === id)
        let updatedTask = {
          ...tasks[taskIndex],
          minutes: minutes,
          seconds: seconds,
        }
        const newTasks = [...tasks.slice(0, taskIndex), updatedTask, ...tasks.slice(taskIndex + 1)]
        return {
          tasks: newTasks,
        }
      })
    }
    this.onToggleCompleted = (evt) => {
      console.log(evt)
      const taskInputElement = evt.target || evt
      let newClassName = taskStatusClassName.ACTIVE
      if (taskInputElement.checked) {
        newClassName = taskStatusClassName.COMPLETED
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
    this.addItem = (text, minutes, seconds) => {
      const newTask = {
        id: this.userMaxId++,
        className: taskStatusClassName.ACTIVE,
        description: text,
        created: new Date(),
        editing: false,
        minutes: minutes,
        seconds: seconds,
      }
      this.setState(({ tasks }) => {
        const newTasks = [...tasks, newTask]
        return {
          tasks: newTasks,
        }
      })
    }
    this.onInputChange = (evt) => {
      const inputFiledName = evt.target.placeholder
      switch (inputFiledName) {
        case 'Min':
          this.setState({
            inputMinutes: evt.target.value,
          })
          break
        case 'Sec':
          this.setState({
            inputSeconds: evt.target.value,
          })
          break
        default:
          this.setState({
            inputTask: evt.target.value,
          })
          break
      }
    }
    this.onSubmit = (evt) => {
      evt.preventDefault()
      const text = this.state.inputTask.trim()
      const minutes = Math.round(this.state.inputMinutes)
      const seconds = Math.round(this.state.inputSeconds)
      if (text) {
        this.addItem(text, minutes, seconds)
        this.setState(() => {
          return {
            inputTask: '',
            inputMinutes: '',
            inputSeconds: '',
          }
        })
      }
    }
    this.onFilterButtonClick = (evt) => {
      const targetButtonName = evt.target.dataset.buttonName
      this.setState(({ filterButtons }) => {
        const newFilteredButtons = filterButtons.map((button) => {
          if (targetButtonName === button.buttonText) {
            button.className = filterButtonClassName.SELECTED
            return button
          }
          button.className = filterButtonClassName.NOT_SELECTED
          return button
        })
        return {
          filterButtons: newFilteredButtons,
        }
      })
    }
    this.deleteAllCompletedTasks = () => {
      this.setState(({ tasks }) => {
        const newTasks = tasks.filter((task) => task.className !== taskStatusClassName.COMPLETED)
        return {
          tasks: newTasks,
        }
      })
    }
    this.updateTask = (targetElement, selectedUpdateType, newDescription = '') => {
      this.setState(({ tasks }) => {
        const taskIndex = tasks.findIndex((task) => task.id === Number(targetElement.closest('li').dataset.id))
        let updatedTask
        switch (selectedUpdateType) {
          case updateType.START_EDITING:
            updatedTask = {
              ...tasks[taskIndex],
              previousClassName: tasks[taskIndex].className,
              className: taskStatusClassName.EDITING,
              editing: true,
            }
            break
          case updateType.CANCEL_EDITING:
            updatedTask = {
              ...tasks[taskIndex],
              previousClassName: null,
              className: tasks[taskIndex].previousClassName,
              editing: false,
            }
            break
          case updateType.EDITED:
            updatedTask = {
              ...tasks[taskIndex],
              previousClassName: null,
              className: tasks[taskIndex].previousClassName,
              editing: false,
              description: newDescription,
            }
            break
        }
        const newTasks = [...tasks.slice(0, taskIndex), updatedTask, ...tasks.slice(taskIndex + 1)]
        return {
          tasks: newTasks,
        }
      })
    }
    this.onEditButtonClick = (evt) => {
      const editButtonElement = evt.target
      this.updateTask(editButtonElement, updateType.START_EDITING)
    }
    this.onEditFieldKeyDown = (evt) => {
      const editField = evt.target
      const newValue = editField.value.trim()
      switch (evt.key) {
        case eventKey.ESCAPE:
          this.updateTask(editField, updateType.CANCEL_EDITING)
          break
        case eventKey.ENTER:
          if (!newValue) {
            return
          }
          this.updateTask(editField, updateType.EDITED, newValue)
          break
      }
    }
  }

  render() {
    const { tasks } = this.state
    const countActiveTasks = tasks.filter((task) => task.className !== taskStatusClassName.COMPLETED).length
    return (
      <section className="todoapp">
        <header className="header">
          <h1>Todos</h1>
          <NewTaskForm
            onInputChange={this.onInputChange}
            onSubmit={this.onSubmit}
            inputTask={this.state.inputTask}
            inputMinutes={this.state.inputMinutes}
            inputSeconds={this.state.inputSeconds}
          />
        </header>
        <section className="main">
          <TaskList
            tasks={tasks}
            onToggleCompleted={this.onToggleCompleted}
            onDelete={this.deleteItem}
            onEditButtonClick={this.onEditButtonClick}
            onEditFieldKeyDown={this.onEditFieldKeyDown}
            filterButtons={this.state.filterButtons}
            startTimer={this.startTimer}
            stopTimer={this.stopTimer}
            updateTimerTime={this.updateTimerTime}
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

export { filterButtonName, taskStatusClassName }
