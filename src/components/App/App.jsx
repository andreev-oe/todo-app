import React, { useState } from 'react'

import { NewTaskForm } from '../NewTaskForm/index.js'
import { TaskList } from '../TaskList/index.js'
import { Footer } from '../Footer/index.js'

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
let userMaxId = 1000
const filterButtonsInitialState = {
  All: filterButtonClassName.SELECTED,
  Active: filterButtonClassName.NOT_SELECTED,
  Completed: filterButtonClassName.NOT_SELECTED,
}
const App = () => {
  const [tasks, setTasks] = useState([])
  const [filterButtons, setFilterButtons] = useState(filterButtonsInitialState)
  const [inputTask, setInputTask] = useState('')
  const [inputMinutes, setInputMinutes] = useState('')
  const [inputSeconds, setInputSeconds] = useState('')
  const updateTimerTime = (id, minutes, seconds) => {
    setTasks((tasks) => {
      const taskIndex = tasks.findIndex((task) => task.id === id)
      if (taskIndex >= 0) {
        let updatedTask = {
          ...tasks[taskIndex],
          minutes: minutes,
          seconds: seconds,
        }
        return [...tasks.slice(0, taskIndex), updatedTask, ...tasks.slice(taskIndex + 1)]
      }
      return [...tasks]
    })
  }
  const onToggleCompleted = (evt) => {
    const taskInputElement = evt.target || evt
    let newClassName = taskStatusClassName.ACTIVE
    if (taskInputElement.checked) {
      newClassName = taskStatusClassName.COMPLETED
    }
    const taskIndex = tasks.findIndex((task) => task.id === Number(taskInputElement.closest('li').dataset.id))
    const newTasks = [...tasks]
    newTasks[taskIndex].className = newClassName
    setTasks(newTasks)
  }
  const deleteItem = (evt) => {
    setTasks((tasks) => {
      const deleteButtonElement = evt.target
      const taskIndex = tasks.findIndex((task) => task.id === Number(deleteButtonElement.closest('li').dataset.id))
      return [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)]
    })
  }
  const addItem = (text, minutes, seconds) => {
    const newTask = {
      id: userMaxId++,
      previousClassName: null,
      className: taskStatusClassName.ACTIVE,
      description: text,
      created: new Date(),
      editing: false,
      minutes: minutes,
      seconds: seconds,
    }
    const newTasks = [...tasks, newTask]
    setTasks(newTasks)
  }
  const onInputChange = (evt) => {
    const inputFiledName = evt.target.placeholder
    switch (inputFiledName) {
      case 'Min':
        setInputMinutes(evt.target.value)
        break
      case 'Sec':
        setInputSeconds(evt.target.value)
        break
      default:
        setInputTask(evt.target.value)
        break
    }
  }
  const onSubmit = (evt) => {
    evt.preventDefault()
    const text = inputTask.trim()
    const minutes = Math.round(inputMinutes)
    const seconds = Math.round(inputSeconds)
    if (text) {
      addItem(text, minutes, seconds)
      setInputTask('')
      setInputMinutes('')
      setInputSeconds('')
    }
  }
  const onFilterButtonClick = (evt) => {
    const targetButtonName = evt.target.dataset.buttonName
    const updatedFilterButtons = { ...filterButtons }
    Object.keys(updatedFilterButtons).map((button) => {
      if (targetButtonName === button) {
        updatedFilterButtons[button] = filterButtonClassName.SELECTED
        return updatedFilterButtons[button]
      }
      updatedFilterButtons[button] = filterButtonClassName.NOT_SELECTED
      return updatedFilterButtons[button]
    })
    setFilterButtons(updatedFilterButtons)
  }
  const deleteAllCompletedTasks = () => {
    const newTasks = tasks.filter((task) => task.className !== taskStatusClassName.COMPLETED)
    setTasks(newTasks)
  }
  const updateTask = (targetElement, selectedUpdateType, newDescription = '') => {
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
    setTasks(newTasks)
  }
  const onEditButtonClick = (evt) => {
    const editButtonElement = evt.target
    updateTask(editButtonElement, updateType.START_EDITING)
  }
  const onEditFieldKeyDown = (evt) => {
    const editField = evt.target
    const newValue = editField.value.trim()
    switch (evt.key) {
      case eventKey.ESCAPE:
        updateTask(editField, updateType.CANCEL_EDITING)
        break
      case eventKey.ENTER:
        if (!newValue) {
          return
        }
        updateTask(editField, updateType.EDITED, newValue)
        break
    }
  }

  const countActiveTasks = tasks.filter((task) => task.className !== taskStatusClassName.COMPLETED).length
  return (
    <section className="todoapp">
      <header className="header">
        <h1>Todos</h1>
        <NewTaskForm
          onInputChange={onInputChange}
          onSubmit={onSubmit}
          inputTask={inputTask}
          inputMinutes={inputMinutes}
          inputSeconds={inputSeconds}
        />
      </header>
      <section className="main">
        <TaskList
          tasks={tasks}
          onToggleCompleted={onToggleCompleted}
          onDelete={deleteItem}
          onEditButtonClick={onEditButtonClick}
          onEditFieldKeyDown={onEditFieldKeyDown}
          filterButtons={filterButtons}
          updateTimerTime={updateTimerTime}
        />
        <Footer
          countActiveTasks={countActiveTasks}
          filterButtons={filterButtons}
          onFilterButtonClick={onFilterButtonClick}
          deleteAllCompletedTasks={deleteAllCompletedTasks}
        />
      </section>
    </section>
  )
}
export default App
export { filterButtonName, taskStatusClassName, filterButtonClassName }
