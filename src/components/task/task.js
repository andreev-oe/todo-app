import React from 'react';
import PropTypes from 'prop-types';

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
                    checked={className} />
                    <label>
                        <span className="description">{description}</span>
                        <span className="created">{created}</span>
                    </label>
                    <button className="icon icon-edit"></button>
                    <button
                        className="icon icon-destroy"
                        onClick={onDelete}>
                    </button>
            </div>
            {editing ? <input type="text" className="edit" defaultValue={description} /> : null}
        </li>
    )
}

Task.defaultProps = {
    onDelete: () => {},
    onToggle: () => {},
    props: {}
}
Task.propTypes = {
    onDelete: PropTypes.func,
    onToggle: PropTypes.func,
    props: (props, propName, componentName) => {
        const value = props[propName]
        if (typeof value === 'object' && Object.keys(value).length > 0) {
            return null
        }
        return new TypeError(`${componentName}: ${propName} mustn't be an empty Object`)
    },
}

export default Task