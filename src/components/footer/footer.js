import React from 'react'
import PropTypes from 'prop-types'

import Filters from '../filters/filters.js'

const Footer = ({ countActiveTasks, deleteAllCompletedTasks, filterButtons, onFilterButtonClick }) => {
  return (
    <footer className="footer">
      <span className="todo-count">
        {countActiveTasks} {countActiveTasks === 1 ? 'item' : 'items'} left
      </span>
      <Filters filterButtons={filterButtons} onFilterButtonClick={onFilterButtonClick} />
      <button className="clear-completed" onClick={deleteAllCompletedTasks}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  deleteAllCompletedTasks: () => {},
  countActiveTasks: 0,
}
Footer.propTypes = {
  deleteAllCompletedTasks: PropTypes.func,
  countActiveTasks: PropTypes.number,
}

export default Footer
