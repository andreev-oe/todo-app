import React from 'react';
import Filters from '../filters/filters.js';

const Footer = ({countActiveTasks, deleteAllCompletedTasks, filterButtons, onFilterButtonClick}) => {
    return (
        <footer className="footer">
            <span className="todo-count">
                {countActiveTasks} {countActiveTasks === 1 ? 'item' : 'items'} left
            </span>
                <Filters
                    filterButtons={filterButtons}
                    onFilterButtonClick={onFilterButtonClick}/>
            <button
                className="clear-completed"
                onClick={deleteAllCompletedTasks}>
                Clear completed
            </button>
        </footer>
    )
}

Footer.defaultProps = {
    deleteAllCompletedTasks: () => {},
    countActiveTasks: 0
}
Footer.propTypes = {
    deleteAllCompletedTasks: (props, propName, componentName) => {
        const value = props[propName]
        if (typeof value === 'function') {
            return null
        }
        return new TypeError(`${componentName}: ${propName} must be a Function`)
    },
    countActiveTasks: (props, propName, componentName) => {
        const value = props[propName]
        if (typeof value === 'number') {
            return null
        }
        return new TypeError(`${componentName}: ${propName} must be a Number`)
    },
}

export default Footer