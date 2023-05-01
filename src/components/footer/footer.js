import React from 'react';
import Filters from '../filters/filters.js';

const Footer = ({filterButtons}) => {
    return (
        <footer className="footer">
            <span className="todo-count">1 items left</span>
                <Filters filterButtons={filterButtons}/>
            <button className="clear-completed">Clear completed</button>
        </footer>
    )
}

export default Footer