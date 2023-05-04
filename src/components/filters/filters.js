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

export default Filters