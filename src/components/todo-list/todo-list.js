import React from 'react';
import Task from '../task/task.js';

const TodoList = ({tasks}) => {
    return (
        <ul className="todo-list">
            {tasks.map((task) => {
                const {id, ...data} = task
                return <Task key={id} props={data}/>
            })}
        </ul>
    )
}

export default TodoList