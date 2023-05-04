import React from 'react';
import TaskFilter from '../task-filter/task-filter.js';

const Filters = ({filterButtons, onFilterButtonClick}) => {
    return (
        <ul className="filters">
            {filterButtons.map((button) => {
                const {id, ...data} = button
                return <TaskFilter
                    key={id}
                    props={data}
                    onFilterButtonClick={onFilterButtonClick} />
            })}
        </ul>
    )
}

Filters.defaultProps = {
    onFilterButtonClick: () => {},
    filterButtons: []
}
Filters.propTypes = {
    onFilterButtonClick: (props, propName, componentName) => {
        const value = props[propName]
        if (typeof value === 'function') {
            return null
        }
        return new TypeError(`${componentName}: ${propName} must be a Function`)
    },
    filterButtons: (props, propName, componentName) => {
        const value = props[propName]
        if (Array.isArray(value)) {
            return null
        }
        return new TypeError(`${componentName}: ${propName} must be an Array of Objects`)
    },
}

export default Filters