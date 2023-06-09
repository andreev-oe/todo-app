import React from 'react'
import PropTypes from 'prop-types'

import { Task } from '../Task/index.js'
import { filterButtonName, taskStatusClassName, filterButtonClassName } from '../App/App.jsx'

const TaskList = ({
  onEditFieldKeyDown,
  onEditButtonClick,
  onDelete,
  onToggleCompleted,
  tasks,
  filterButtons,
  updateTimerTime,
}) => {
  const activeFilterButton = Object.keys(filterButtons).find((button) => {
    if (filterButtons[button] === filterButtonClassName.SELECTED) {
      return button
    }
  })
  const getFilteredTasks = (tasks, clickedFilterButtonName) => {
    let filteredTasks
    switch (clickedFilterButtonName) {
      case filterButtonName.ACTIVE:
        filteredTasks = tasks.filter(
          (task) => task.className === taskStatusClassName.ACTIVE || task.className === taskStatusClassName.EDITING
        )
        break
      case filterButtonName.COMPLETED:
        filteredTasks = tasks.filter(
          (task) => task.className === taskStatusClassName.COMPLETED || task.className === taskStatusClassName.EDITING
        )
        break
      default:
        filteredTasks = tasks
    }
    return filteredTasks
  }
  const filteredTasks = getFilteredTasks(tasks, activeFilterButton)
  return (
    <ul className="todo-list">
      {filteredTasks.map((task) => {
        const { id } = task
        return (
          <Task
            key={id}
            task={task}
            onToggleCompleted={onToggleCompleted}
            onDelete={onDelete}
            onEditButtonClick={onEditButtonClick}
            onEditFieldKeyDown={onEditFieldKeyDown}
            updateTimerTime={updateTimerTime}
          />
        )
      })}
    </ul>
  )
}

TaskList.defaultProps = {
  tasks: [],
}
TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
}

export default TaskList
