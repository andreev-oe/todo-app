import React from 'react';
import NewTaskForm from '../new-task-form/new-task-form.js';

const Header = ({onInputChange, onSubmit, inputValue}) => {
    return (
        <header className="header">
            <h1>Todos</h1>
            <NewTaskForm onInputChange={onInputChange} onSubmit={onSubmit} inputValue={inputValue}/>
        </header>
    )
}

export default Header