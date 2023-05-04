import React from 'react';

const NewTaskForm = ({onInputChange, onSubmit, inputValue}) => {
    return (
        <form
            className="form"
            onSubmit={onSubmit}>
            <input
                className="new-todo"
                placeholder="What needs to be done?"
                autoFocus
                onChange={onInputChange}
                value={inputValue} />
        </form>
    )
}
//TODO add defaultProps for inputValue
NewTaskForm.defaultProps = {
    onInputChange: () => {},
    onSubmit: () => {},
}
NewTaskForm.propTypes = {
    onInputChange: (props, propName, componentName) => {
        const value = props[propName]
        if (typeof value === 'function') {
            return null
        }
        return new TypeError(`${componentName}: ${propName} must be a Function`)
    },
    onSubmit: (props, propName, componentName) => {
        const value = props[propName]
        if (typeof value === 'function') {
            return null
        }
        return new TypeError(`${componentName}: ${propName} must be a Function`)
    },
    inputValue: (props, propName, componentName) => {
        const value = props[propName]
        if (typeof value === 'string') {
            return null
        }
        return new TypeError(`${componentName}: ${propName} must be a String`)
    },
}

export default NewTaskForm