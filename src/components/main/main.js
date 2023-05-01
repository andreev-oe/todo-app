import React from 'react';
import TodoList from '../todo-list/todo-list.js';
import Footer from '../footer/footer.js';

const Main = () => {
    return (
        <section className="main">
            <TodoList />
            <Footer />
        </section>
    )
}

export default Main