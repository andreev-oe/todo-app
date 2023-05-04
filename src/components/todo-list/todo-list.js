import React from 'react';
import Task from '../task/task.js';

const TodoList = ({onDelete, onToggle, tasks}) => {
    return (
        <ul className="todo-list">
            {tasks.map((task) => {
                const {id} = task
                return <Task
                    key={id}
                    props={task}
                    onToggle={onToggle}
                    onDelete={onDelete}/>
            })}
        </ul>
    )
}
//TODO check work with empty tasks array
TodoList.defaultProps = {
    tasks: []
}
TodoList.propTypes = {
    tasks: (props, propName, componentName) => {
        const value = props[propName]
        if (Array.isArray(value)) {
            return null
        }
        return new TypeError(`${componentName}: ${propName} must be an Array of Objects`)
    }
}

export default TodoList