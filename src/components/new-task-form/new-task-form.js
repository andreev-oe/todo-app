import React from 'react'
import PropTypes from 'prop-types'

const NewTaskForm = ({ onInputChange, onSubmit, inputValue }) => {
  return (
    <form className="form" onSubmit={onSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onChange={onInputChange}
        value={inputValue}
      />
    </form>
  )
}

NewTaskForm.defaultProps = {
  onInputChange: () => {},
  onSubmit: () => {},
  inputValue: '',
}
NewTaskForm.propTypes = {
  onInputChange: PropTypes.func,
  onSubmit: PropTypes.func,
  inputValue: PropTypes.string,
}

export default NewTaskForm
