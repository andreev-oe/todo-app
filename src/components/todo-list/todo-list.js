import React from 'react'
import PropTypes from 'prop-types'

import Task from '../task/task.js'

const TodoList = ({ onEditFieldKeyDown, onEditButtonClick, onDelete, onToggleCompleted, tasks, filterButtons }) => {
  const activeFilterButton = filterButtons.filter((button) => button.className === 'selected')[0].buttonText
  const getFilteredTasks = (tasks, filterButtonName) => {
    let filteredTasks
    switch (filterButtonName) {
      case 'Active':
        filteredTasks = tasks.filter((task) => task.className === '' || task.className === 'editing')
        break
      case 'Completed':
        filteredTasks = tasks.filter((task) => task.className === 'completed' || task.className === 'editing')
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
