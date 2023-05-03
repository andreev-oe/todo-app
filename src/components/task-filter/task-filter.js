import React from 'react';

const TaskFilter = ({props, onFilterButtonClick}) => {
    const {id, className, buttonText} = props
    return (
        <li key={id}>
            <button className={className} data-button-name={buttonText} onClick={onFilterButtonClick}>{buttonText}</button>
        </li>
    )
}

export default TaskFilter