import React from 'react'
import PropTypes from 'prop-types'

const NewTaskForm = ({ onInputChange, onSubmit, inputTask, inputMinutes, inputSeconds }) => {
  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onChange={onInputChange}
        value={inputTask}
        required
      />
      <input
        type="number"
        step={1}
        className="new-todo-form__timer"
        placeholder="Min"
        onChange={onInputChange}
        value={inputMinutes}
        required
        min={0}
      />
      <input
        type="number"
        step={1}
        className="new-todo-form__timer"
        placeholder="Sec"
        onChange={onInputChange}
        value={inputSeconds}
        required
        min={0}
        max={60}
      />
      <button type="submit"></button>
    </form>
  )
}

NewTaskForm.defaultProps = {
  onInputChange: () => {},
  // onSubmit: () => {},
  inputValue: '',
}
NewTaskForm.propTypes = {
  onInputChange: PropTypes.func,
  // onSubmit: PropTypes.func,
  inputValue: PropTypes.string,
}

export default NewTaskForm
