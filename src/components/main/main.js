import React from 'react';
import TodoList from '../todo-list/todo-list.js';
import Footer from '../footer/footer.js';

const Main = ({countActiveTasks, onDelete, onToggle, tasks, filterButtons, onFilterButtonClick}) => {
    return (
        <section className="main">
            <TodoList tasks={tasks} onToggle={onToggle} onDelete={onDelete}/>
            <Footer countActiveTasks={countActiveTasks} filterButtons={filterButtons} onFilterButtonClick={onFilterButtonClick}/>
        </section>
    )
}

export default Main