import React from 'react';
import TodoList from '../todo-list/todo-list.js';
import Footer from '../footer/footer.js';

const Main = ({countActiveTasks, onEditFieldEnterKeyDown, onEditButtonClick, onDelete, onToggleCompleted, tasks, filterButtons, onFilterButtonClick, deleteAllCompletedTasks}) => {
    return (
        <section className="main">
            <TodoList
                tasks={tasks}
                onToggleCompleted={onToggleCompleted}
                onDelete={onDelete}
                onEditButtonClick={onEditButtonClick}
                onEditFieldEnterKeyDown={onEditFieldEnterKeyDown} />
            <Footer
                countActiveTasks={countActiveTasks}
                filterButtons={filterButtons}
                onFilterButtonClick={onFilterButtonClick}
                deleteAllCompletedTasks={deleteAllCompletedTasks} />
        </section>
    )
}

export default Main