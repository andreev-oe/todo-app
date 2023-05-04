import React from 'react';
import PropTypes from 'prop-types';
import {formatDistanceToNow} from 'date-fns';

const Task = ({onEditFieldEnterKeyDown, onEditButtonClick, onDelete, onToggleCompleted, props}) => {
    const setDate = (date) => {
        return formatDistanceToNow(date, { addSuffix: true, includeSeconds: true })
    }
    const {id, className, description, created, editing} = props
    return (
        <li
            className={className}
            data-id={id}>
            <div className="view">
                <input
                    className="toggle"
                    type="checkbox"
                    onChange={onToggleCompleted}
                    checked={className}/>
                    <label>
                        <span className="description">{description}</span>
                        <span className="created">{setDate(created)}</span>
                    </label>
                    <button
                        className="icon icon-edit"
                        onClick={onEditButtonClick}>
                    </button>
                    <button
                        className="icon icon-destroy"
                        onClick={onDelete}>
                    </button>
            </div>
            {editing ? <input type="text" className="edit" defaultValue={description} onKeyDown={onEditFieldEnterKeyDown} autoFocus={true} /> : null}
        </li>
    )
}

Task.defaultProps = {
    onDelete: () => {},
    onToggleCompleted: () => {},
    props: {}
}
Task.propTypes = {
    onDelete: PropTypes.func,
    onToggleCompleted: PropTypes.func,
    props: (props, propName, componentName) => {
        const value = props[propName]
        if (typeof value === 'object' && Object.keys(value).length > 0) {
            return null
        }
        return new TypeError(`${componentName}: ${propName} mustn't be an empty Object`)
    },
}

export default Task