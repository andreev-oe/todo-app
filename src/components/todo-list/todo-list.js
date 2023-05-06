import React from 'react'
import PropTypes from 'prop-types'

import Task from '../task/task.js'
import { filterButtonName, taskStatusClassName } from '../app/app.js'

const TodoList = ({ onEditFieldKeyDown, onEditButtonClick, onDelete, onToggleCompleted, tasks, filterButtons }) => {
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
            props={task}
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

TodoList.defaultProps = {
  tasks: [],
}
TodoList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
}

export default TodoList
