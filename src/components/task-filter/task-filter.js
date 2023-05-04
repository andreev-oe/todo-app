import React from 'react';

const TaskFilter = ({props, onFilterButtonClick}) => {
    const {id, className, buttonText} = props
    return (
        <li key={id}>
            <button
                className={className}
                data-button-name={buttonText}
                onClick={onFilterButtonClick}>
                {buttonText}
            </button>
        </li>
    )
}

TaskFilter.defaultProps = {
    onFilterButtonClick: () => {},
    props: {}
}
TaskFilter.propTypes = {
    onFilterButtonClick: (props, propName, componentName) => {
        const value = props[propName]
        if (typeof value === 'function') {
            return null
        }
        return new TypeError(`${componentName}: ${propName} must be a Function`)
    },
    props: (props, propName, componentName) => {
        const value = props[propName]
        if (typeof value === 'object' && Object.keys(value).length > 0) {
            return null
        }
        return new TypeError(`${componentName}: ${propName} mustn't be an empty Object`)
    },
}

export default TaskFilter