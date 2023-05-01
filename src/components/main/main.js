import React from 'react';
import TodoList from '../todo-list/todo-list.js';
import Footer from '../footer/footer.js';

const Main = ({tasks, filterButtons}) => {
    console.log(tasks)
    console.log(filterButtons)
    return (
        <section className="main">
            <TodoList tasks={tasks}/>
            <Footer filterButtons={filterButtons}/>
        </section>
    )
}

export default Main