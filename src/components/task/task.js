import React from 'react';

const Task = ({onDelete, onToggle, props}) => {
    const {id, className, description, created, editing} = props
    return (
        <li
            className={className}
            data-id={id}>
            <div className="view">
                <input
                    className="toggle"
                    type="checkbox"
                    onChange={onToggle}
                    checked={className}/>
                    <label>
                        <span className="description">{description}</span>
                        <span className="created">{created}</span>
                    </label>
                    <button className="icon icon-edit"></button>
                    <button
                        className="icon icon-destroy"
                    onClick={onDelete}></button>
            </div>
            {editing ? <input type="text" className="edit" defaultValue={description}/> : null}
        </li>
    )
}

export default Task