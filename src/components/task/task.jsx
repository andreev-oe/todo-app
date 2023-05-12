import React from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import { taskStatusClassName } from '../app/app.jsx'
const TIMER_INTERVAL = 1000
const MIN_LENGTH = 2
const SECONDS_IN_MINUTE = 60
const MILLISECONDS_IN_SECOND = 1000

export default class Task extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startTime: 0,
      elapsedTime: 0,
      totalTime: 0,
      startedCounting: false,
      taskTimerInterval: null,
    }
    this.startTimer = () => {
      if (this.state.startedCounting) {
        return
      }
      this.setState(() => {
        return {
          startTime: Date.now(),
          startedCounting: true,
        }
      })
      const taskTimerInterval = setInterval(() => {
        this.setState(({ startTime, totalTime }) => {
          const timeStamp = Date.now()
          return {
            elapsedTime: timeStamp - startTime + totalTime,
            taskTimerInterval: taskTimerInterval,
          }
        })
      }, TIMER_INTERVAL)
    }
    this.stopTimer = () => {
      this.setState(({ taskTimerInterval, elapsedTime }) => {
        clearInterval(taskTimerInterval)
        return {
          totalTime: elapsedTime,
          startTime: null,
          startedCounting: false,
        }
      })
    }
  }
  componentWillUnmount() {
    clearInterval(this.state.taskTimerInterval)
  }

  render() {
    const { onEditFieldKeyDown, onEditButtonClick, onDelete, onToggleCompleted, task } = this.props
    const { elapsedTime } = this.state
    const setDate = (date) => formatDistanceToNow(date, { addSuffix: true, includeSeconds: true })
    const formatTime = (time) => time.padStart(MIN_LENGTH, '0')
    const { id, className, description, created, editing } = task
    let timeStampToSeconds = Math.floor(elapsedTime / MILLISECONDS_IN_SECOND)
    let hours = String(Math.floor(timeStampToSeconds / SECONDS_IN_MINUTE / SECONDS_IN_MINUTE))
    let minutes = String(Math.floor(timeStampToSeconds / SECONDS_IN_MINUTE) - hours * SECONDS_IN_MINUTE)
    let seconds = String(Math.floor(timeStampToSeconds % SECONDS_IN_MINUTE))
    return (
      <li className={className} data-id={id}>
        <div className="view">
          <input id={id} className="toggle" type="checkbox" onChange={onToggleCompleted} checked={className} />
          <label htmlFor={id}>
            <span className="title">{description}</span>
            <span className="description">
              <button className="icon icon-play" data-id={id} onClick={this.startTimer}></button>
              <button className="icon icon-pause" data-id={id} onClick={this.stopTimer}></button>
              <span className="estimated-time">
                {`${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`}
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
  onEditFieldKeyDown: () => {},
  onEditButtonClick: () => {},
  onDelete: () => {},
  onToggleCompleted: () => {},
  task: {},
}
Task.propTypes = {
  onEditFieldKeyDown: PropTypes.func,
  onEditButtonClick: PropTypes.func,
  onDelete: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  task: PropTypes.objectOf(PropTypes.any),
}
