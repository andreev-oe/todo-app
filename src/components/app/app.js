import React from 'react';
import Header from '../header/header.js';
import Main from '../main/main.js';
import {formatDistanceToNow} from 'date-fns';
const completedTaskCssClass = 'completed'
const filterButtons = [
    {
        id: 1,
        className: 'selected',
        buttonText: 'All'
    },
    {
        id: 2,
        className: '',
        buttonText: 'Active'
    },
    {
        id: 3,
        className: '',
        buttonText: 'Completed'
    },
]

export default class App extends React.Component {
    userMaxId = 1000
    state = {
        tasks: [
            {
                id: 1,
                className: 'completed',
                description: 'Completed task',
                created: formatDistanceToNow(new Date(2023, 3, 28, 12)),
                editing: false
            },
            {
                id: 2,
                className: 'editing',
                description: 'Editing task',
                created: formatDistanceToNow(new Date(2023, 3, 30, 9)),
                editing: true
            },
            {
                id: 3,
                className: '',
                description: 'Active task',
                created: formatDistanceToNow(new Date(2023, 4, 1, 19)),
                editing: false
            }
        ]
    }
    deleteItem = (evt) => {
        const deleteButtonElement = evt.target
        this.setState(({tasks}) => {
            const taskIndex = tasks.findIndex((task) => task.id === Number(deleteButtonElement.closest('li').dataset.id))
            const newTasks = [
                ...tasks.slice(0, taskIndex),
                ...tasks.slice(taskIndex + 1)
            ]
            return {
                tasks: newTasks
            }
        })
    }
    addItem = (text) => {
        const newTask = {
            id: this.userMaxId++,
            className: '',
            description: text,
            created: formatDistanceToNow(new Date(2023, 4, 1, 19)),
            editing: false
        }
        this.setState(({tasks}) => {
            const newTasks = [...tasks, newTask]
            return {
                tasks: newTasks
            }

        })
    }
    onToggle = (evt) => {
        const taskInputElement = evt.target
        let newClassName = ''
        if (taskInputElement.checked) {
            newClassName = completedTaskCssClass
        }
        this.setState(({tasks}) => {
            const taskIndex = tasks.findIndex((task) => task.id === Number(taskInputElement.closest('li').dataset.id))
            const newTasks = [...tasks]
            newTasks[taskIndex].className = newClassName
            return {
                tasks: newTasks
            }
        })
    }
    render() {
        const {tasks} = this.state
        return (
            <section className="todoapp">
                <Header />
                <Main filterButtons={filterButtons} tasks={tasks} onToggle={this.onToggle} onDelete={this.deleteItem}/>
            </section>
        )
    }
}
