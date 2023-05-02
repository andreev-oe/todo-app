import React from 'react';
import TodoList from '../todo-list/todo-list.js';
import Footer from '../footer/footer.js';

const Main = ({onDelete, onToggle, tasks, filterButtons}) => {
    return (
        <section className="main">
            <TodoList tasks={tasks} onToggle={onToggle} onDelete={onDelete}/>
            <Footer filterButtons={filterButtons} />
        </section>
    )
}

export default Main