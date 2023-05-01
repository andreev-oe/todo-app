import React from 'react';

const Task = ({props}) => {
    const {className, description, created, editing} = props
    return (
        <li className={className}>
            <div className="view">
                <input className="toggle" type="checkbox" />
                    <label>
                        <span className="description">{description}</span>
                        <span className="created">{created}</span>
                    </label>
                    <button className="icon icon-edit"></button>
                    <button className="icon icon-destroy"></button>
            </div>
            {editing ? <input type="text" className="edit" defaultValue={description}/> : null}
        </li>
    )
}

export default Task