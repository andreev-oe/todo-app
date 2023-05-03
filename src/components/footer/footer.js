import React from 'react';
import Filters from '../filters/filters.js';

const Footer = ({filterButtons, onFilterButtonClick}) => {
    return (
        <footer className="footer">
            <span className="todo-count">1 items left</span>
                <Filters filterButtons={filterButtons} onFilterButtonClick={onFilterButtonClick}/>
            <button className="clear-completed">Clear completed</button>
        </footer>
    )
}

export default Footer