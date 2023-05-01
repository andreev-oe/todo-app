import React from 'react';

const TaskFilter = ({props}) => {
    const {id, className, buttonText} = props
    return (
        <li key={id}>
            <button className={className}>{buttonText}</button>
        </li>
    )
}

export default TaskFilter