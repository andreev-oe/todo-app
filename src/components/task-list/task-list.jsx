import React from 'react'
import PropTypes from 'prop-types'

import Task from '../task/task.jsx'
import { filterButtonName, taskStatusClassName } from '../app/app.jsx'

const TaskList = ({ onEditFieldKeyDown, onEditButtonClick, onDelete, onToggleCompleted, tasks, filterButtons }) => {
  const activeFilterButton = filterButtons.find((button) => button.className === 'selected').buttonText
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
            id={id}
            task={task}
            onToggleCompleted={onToggleCompleted}
            onDelete={onDelete}
            onEditButtonClick={onEditButtonClick}
            onEditFieldKeyDown={onEditFieldKeyDown}
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
