import React from 'react';
import Task from '../task/task.js';
import PropTypes from 'prop-types';

const TodoList = ({onEditFieldEnterKeyDown, onEditButtonClick, onDelete, onToggleCompleted, tasks}) => {
    return (
        <ul className="todo-list">
            {tasks.map((task) => {
                const {id} = task
                return <Task
                    key={id}
                    props={task}
                    onToggleCompleted={onToggleCompleted}
                    onDelete={onDelete}
                    onEditButtonClick={onEditButtonClick}
                    onEditFieldEnterKeyDown={onEditFieldEnterKeyDown} />
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