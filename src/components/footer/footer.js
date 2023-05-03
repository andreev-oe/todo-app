import React from 'react';
import Filters from '../filters/filters.js';

const Footer = ({countActiveTasks, filterButtons, onFilterButtonClick}) => {
    return (
        <footer className="footer">
            <span className="todo-count">{countActiveTasks} {countActiveTasks === 1 ? 'item' : 'items'} left</span>
                <Filters filterButtons={filterButtons} onFilterButtonClick={onFilterButtonClick}/>
            <button className="clear-completed">Clear completed</button>
        </footer>
    )
}

export default Footer