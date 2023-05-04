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

TodoList.defaultProps = {
    tasks: []
}

export default TodoList