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

export default NewTaskForm