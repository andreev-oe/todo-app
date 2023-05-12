import React from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import { taskStatusClassName } from '../app/app.jsx'

export default class Task extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillUnmount() {
    console.log('componentWillUnmount')
  }

  render() {
    const { onEditFieldKeyDown, onEditButtonClick, onDelete, onToggleCompleted, props, startTimer, stopTimer } =
      this.props
    const setDate = (date) => formatDistanceToNow(date, { addSuffix: true, includeSeconds: true })
    const { id, className, description, created, editing, elapsedTime } = props
    let timeStampToSeconds = Math.floor(elapsedTime / 1000)
    let hours = String(Math.floor(timeStampToSeconds / 60 / 60))
    let minutes = String(Math.floor(timeStampToSeconds / 60) - hours * 60)
    let seconds = String(Math.floor(timeStampToSeconds % 60))
    return (
      <li className={className} data-id={id}>
        <div className="view">
          <input id={id} className="toggle" type="checkbox" onChange={onToggleCompleted} checked={className} />
          <label htmlFor={id}>
            <span className="title">{description}</span>
            <span className="description">
              <button className="icon icon-play" data-id={id} onClick={startTimer}></button>
              <button className="icon icon-pause" data-id={id} onClick={stopTimer}></button>
              <span className="estimated-time">
                {`${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`}
              </span>
            </span>
            <span className="description">{setDate(created)}</span>
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
