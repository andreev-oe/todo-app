import React from 'react';
import ReactDOM from 'react-dom'
import Header from './components/header/header.js';
import Main from './components/main/main.js';
import {formatDistanceToNow} from 'date-fns';
const rootElement = document.getElementById('root')
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
const tasks = [
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

const App = () => {
    return (
        <section className="todoapp">
            <Header />
            <Main filterButtons={filterButtons} tasks={tasks}/>
        </section>
    )
}

ReactDOM.render(<App />, rootElement)