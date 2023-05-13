import React from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import { taskStatusClassName } from '../App/App.jsx'
const TIMER_INTERVAL = 1000
const MIN_LENGTH = 2
const SECONDS_IN_MINUTE = 60
const MILLISECONDS_IN_SECOND = 1000
const CHECKBOX_CSS_CLASS = 'toggle'
const FIRST_TICK_OFFSET = 15

export default class Task extends React.Component {
  constructor(props) {
    super(props)
    this.taskTimerInterval = null
    this.state = {
      previousTimeStamp: null,
      currentTimeStamp: null,
      totalTime: (this.props.task.minutes * SECONDS_IN_MINUTE + this.props.task.seconds) * MILLISECONDS_IN_SECOND,
      startedCounting: false,
    }
    this.startTimer = () => {
      if (this.state.startedCounting) {
        return
      }
      this.setState(() => {
        return {
          previousTimeStamp: Date.now() + FIRST_TICK_OFFSET,
          startedCounting: true,
        }
      })
      const taskTimerInterval = setInterval(() => {
        this.setState(({ previousTimeStamp, currentTimeStamp, totalTime }) => {
          if (totalTime / MILLISECONDS_IN_SECOND < 1) {
            clearInterval(this.taskTimerInterval)
            document.querySelectorAll(`.${CHECKBOX_CSS_CLASS}`).forEach((node) => {
              if (Number(node.id) === this.props.task.id) {
                node.checked = 'true'
                this.props.onToggleCompleted(node)
              }
            })
            return {
              totalTime: totalTime,
              previousTimeStamp: currentTimeStamp,
              startedCounting: false,
            }
          }
          currentTimeStamp = Date.now()
          const elapsedTime = currentTimeStamp - previousTimeStamp
          totalTime = totalTime - elapsedTime
          const minutes = Math.floor(totalTime / MILLISECONDS_IN_SECOND / SECONDS_IN_MINUTE)
          const seconds = Math.floor((totalTime / MILLISECONDS_IN_SECOND) % SECONDS_IN_MINUTE)
          this.props.updateTimerTime(this.props.task.id, minutes, seconds)
          return {
            totalTime: totalTime,
            previousTimeStamp: currentTimeStamp,
          }
        })
      }, TIMER_INTERVAL)
      this.taskTimerInterval = taskTimerInterval
    }
    this.stopTimer = () => {
      this.setState(() => {
        clearInterval(this.taskTimerInterval)
        return {
          startedCounting: false,
        }
      })
    }
  }
  componentWillUnmount() {
    clearInterval(this.taskTimerInterval)
  }

  render() {
    const { onEditFieldKeyDown, onEditButtonClick, onDelete, onToggleCompleted, task } = this.props
    const { id, className, description, created, editing } = task
    const { totalTime, startedCounting } = this.state
    const setDate = (date) => formatDistanceToNow(date, { addSuffix: true, includeSeconds: true })
    const formatTime = (time) => String(time).padStart(MIN_LENGTH, '0')
    let timeStampToSeconds = Math.floor(totalTime / MILLISECONDS_IN_SECOND)
    let hours = String(Math.floor(timeStampToSeconds / SECONDS_IN_MINUTE / SECONDS_IN_MINUTE))
    let minutes = String(Math.floor(timeStampToSeconds / SECONDS_IN_MINUTE) - hours * SECONDS_IN_MINUTE)
    let seconds = String(Math.floor(timeStampToSeconds % SECONDS_IN_MINUTE))
    return (
      <li className={className} data-id={id}>
        <div className="view">
          <input
            id={id}
            className={CHECKBOX_CSS_CLASS}
            type="checkbox"
            onChange={onToggleCompleted}
            checked={className}
          />
          <label htmlFor={id}>
            <span className="title">{description}</span>
            <span className="description">
              <button
                className={`icon icon-play counting-${Boolean(startedCounting)}`}
                data-id={id}
                onClick={this.startTimer}
              ></button>
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
