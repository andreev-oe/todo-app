import React from 'react';
import Task from '../task/task.js';
import PropTypes from 'prop-types';

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
    tasks: PropTypes.arrayOf(PropTypes.object)
}

export default TodoList