import React from 'react'

import NewTaskForm from '../new-task-form/new-task-form.jsx'
import TaskList from '../task-list/task-list.jsx'
import Footer from '../footer/footer.jsx'

const filterButtonName = {
  ALL: 'All',
  ACTIVE: 'Active',
  COMPLETED: 'Completed',
}
const filterButtonClassName = {
  SELECTED: 'selected',
  NOT_SELECTED: '',
}
const evtKey = {
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
        },
        {
          id: this.userMaxId++,
          previousClassName: null,
          className: taskStatusClassName.ACTIVE,
          description: 'Second',
          created: new Date(2023, 3, 30, 9),
          editing: false,
        },
        {
          id: this.userMaxId++,
          previousClassName: null,
          className: taskStatusClassName.ACTIVE,
          description: 'Third',
          created: new Date(2023, 4, 1, 19),
          editing: false,
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
      inputValue: '',
    }
    this.onToggleCompleted = (evt) => {
      const taskInputElement = evt.target
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
    this.addItem = (text) => {
      const newTask = {
        id: this.userMaxId++,
        className: taskStatusClassName.ACTIVE,
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
        case evtKey.ESCAPE:
          this.updateTask(editField, updateType.CANCEL_EDITING)
          break
        case evtKey.ENTER:
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
          <NewTaskForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} inputValue={this.state.inputValue} />
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
