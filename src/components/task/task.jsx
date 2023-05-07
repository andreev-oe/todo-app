import React from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import { taskStatusClassName } from '../app/app.jsx'

const Task = ({ onEditFieldKeyDown, onEditButtonClick, onDelete, onToggleCompleted, props }) => {
  const setDate = (date) => formatDistanceToNow(date, { addSuffix: true, includeSeconds: true })
  const { id, className, description, created, editing } = props
  return (
    <li className={className} data-id={id}>
      <div className="view">
        <input className="toggle" type="checkbox" onChange={onToggleCompleted} checked={className} />
        <label>
          <span className="description">{description}</span>
          <span className="created">{setDate(created)}</span>
        </label>
        <button className="icon icon-edit" onClick={onEditButtonClick}></button>
        <button className="icon icon-destroy" onClick={onDelete}></button>
      </div>
      {editing ? (
        <input
          type="text"
          className={taskStatusClassName.ENABLE_EDIT}
          defaultValue={description}
          onKeyDown={onEditFieldKeyDown}
          autoFocus={true}
        />
      ) : null}
    </li>
  )
}

Task.defaultProps = {
  onDelete: () => {},
  onToggleCompleted: () => {},
  props: {},
}
Task.propTypes = {
  onDelete: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  props: PropTypes.objectOf(PropTypes.any),
}

export default Task
