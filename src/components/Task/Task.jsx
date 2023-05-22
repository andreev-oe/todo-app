import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import { taskStatusClassName } from '../App/App.jsx'
const TIMER_INTERVAL = 1000
const MIN_LENGTH = 2
const SECONDS_IN_MINUTE = 60
const MILLISECONDS_IN_SECOND = 1000
const CHECKBOX_CSS_CLASS = 'toggle'
const FIRST_TICK_OFFSET = 15

const Task = ({ task, onToggleCompleted, onDelete, onEditButtonClick, onEditFieldKeyDown, updateTimerTime }) => {
  const [previousTimeStamp, setPreviousTimeStamp] = useState(null)
  const [totalTime, setTotalTime] = useState(task.minutes * SECONDS_IN_MINUTE + task.seconds)
  const [startedCounting, setStartedCounting] = useState(false)
  const { id, className, description, created, editing } = task
  const setDate = (date) => formatDistanceToNow(date, { addSuffix: true, includeSeconds: true })
  const formatTime = (time) => String(time).padStart(MIN_LENGTH, '0')
  let hours = String(Math.floor(totalTime / SECONDS_IN_MINUTE / SECONDS_IN_MINUTE))
  let minutes = String(Math.floor(totalTime / SECONDS_IN_MINUTE) - hours * SECONDS_IN_MINUTE)
  let seconds = String(Math.floor(totalTime % SECONDS_IN_MINUTE))
  useEffect(() => {
    let taskTimerInterval
    if (startedCounting) {
      taskTimerInterval = setInterval(() => {
        let newTimeStamp = Date.now()
        const elapsedTime = (newTimeStamp - previousTimeStamp) / MILLISECONDS_IN_SECOND
        let newTotalTime = totalTime - elapsedTime
        if (newTotalTime <= 0) {
          clearInterval(taskTimerInterval)
          document.querySelectorAll(`.${CHECKBOX_CSS_CLASS}`).forEach((node) => {
            if (Number(node.id) === task.id) {
              node.checked = 'true'
              onToggleCompleted(node)
            }
          })
        }
        setTotalTime(newTotalTime <= 0 ? 0 : newTotalTime)
        setPreviousTimeStamp(newTotalTime <= 0 ? previousTimeStamp : newTimeStamp)
        setStartedCounting(newTotalTime <= 0 ? false : true)
      }, TIMER_INTERVAL)
    }
    return () => {
      const minutes = Math.floor(totalTime / SECONDS_IN_MINUTE)
      const seconds = Math.floor(totalTime % SECONDS_IN_MINUTE)
      updateTimerTime(task.id, minutes, seconds)
      clearInterval(taskTimerInterval)
    }
  }, [startedCounting, totalTime])
  const startTimer = () => {
    setPreviousTimeStamp(Date.now() + FIRST_TICK_OFFSET)
    setStartedCounting(true)
  }
  const stopTimer = () => {
    setStartedCounting(false)
  }
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
              onClick={startTimer}
            ></button>
            <button className="icon icon-pause" data-id={id} onClick={stopTimer}></button>
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
          autoFocus
        />
      ) : null}
    </li>
  )
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

export default Task
