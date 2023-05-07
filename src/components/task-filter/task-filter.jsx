import React from 'react'
import PropTypes from 'prop-types'

const TaskFilter = ({ props, onFilterButtonClick }) => {
  const { id, className, buttonText } = props
  return (
    <li key={id}>
      <button className={className} data-button-name={buttonText} onClick={onFilterButtonClick}>
        {buttonText}
      </button>
    </li>
  )
}

TaskFilter.defaultProps = {
  onFilterButtonClick: () => {},
  props: {},
}
TaskFilter.propTypes = {
  onFilterButtonClick: PropTypes.func,
  props: PropTypes.objectOf(PropTypes.any),
}

export default TaskFilter
