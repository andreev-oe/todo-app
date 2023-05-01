import React from 'react';
import TaskFilter from '../task-filter/task-filter.js';

const Filters = ({filterButtons}) => {
    return (
        <ul className="filters">
            {filterButtons.map((button) => {
                const {id, ...data} = button
                return <TaskFilter key={id} props={data} />
            })}
        </ul>
    )
}

export default Filters