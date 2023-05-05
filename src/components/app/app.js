import React from 'react';
import NewTaskForm from '../new-task-form/new-task-form.js';
import TodoList from '../todo-list/todo-list.js';
import Footer from '../footer/footer.js';
const completedTaskCssClass = 'completed'
const filterButtonsNames = {
    all: 'All',
    active: 'Active',
    completed: 'Completed'
}

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.userMaxId = 1000
        this.state = {
            tasks: [
                {
                    id: this.userMaxId++,
                    className: 'completed',
                    description: 'First',
                    created: new Date(2023, 3, 28, 12),
                    editing: false
                },
                {
                    id: this.userMaxId++,
                    className: '',
                    description: 'Second',
                    created: new Date(2023, 3, 30, 9),
                    editing: false
                },
                {
                    id: this.userMaxId++,
                    className: '',
                    description: 'Third',
                    created: new Date(2023, 4, 1, 19),
                    editing: false
                }
            ],
            filteredTasks: null,
            filterButtons: [
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
            ],
            inputValue: ''
        }
    }
    deleteItem = (evt) => {
        const deleteButtonElement = evt.target
        let newFilteredTasks
        this.setState(({tasks, filteredTasks}) => {
            const taskIndex = tasks.findIndex((task) => task.id === Number(deleteButtonElement.closest('li').dataset.id))
            const newTasks = [
                ...tasks.slice(0, taskIndex),
                ...tasks.slice(taskIndex + 1)
            ]
            if (filteredTasks) {
                const filteredTaskIndex = filteredTasks.findIndex((task) => task.id === Number(deleteButtonElement.closest('li').dataset.id))
                newFilteredTasks = [
                    ...filteredTasks.slice(0, filteredTaskIndex),
                    ...filteredTasks.slice(filteredTaskIndex + 1)
                ]
            }
            return {
                tasks: newTasks,
                filteredTasks: newFilteredTasks || this.tasks
            }
        })
    }
    addItem = (text) => {
        const newTask = {
            id: this.userMaxId++,
            className: '',
            description: text,
            created: new Date(),
            editing: false
        }
        this.setState(({tasks}) => {
            const newTasks = [...tasks, newTask]
            return {
                tasks: newTasks,
                filteredTasks: this.tasks
            }
        })
    }
    onToggleCompleted = (evt) => {
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
    onInputChange = (evt) => {
        this.setState({
            inputValue: evt.target.value
        })
    }
    onSubmit = (evt) => {
        evt.preventDefault()
        this.addItem(this.state.inputValue)
        this.setState(() => {
            return {
                inputValue: ''
            }
        })
        this.changeFilterButtonClass(filterButtonsNames.all)
    }
    changeFilterButtonClass = (target) => {
        this.setState(({filterButtons}) => {
            const newFilteredButtons = filterButtons.map((button) => {
                if (target === button.buttonText) {
                    button.className = 'selected'
                    return button
                }
                button.className = ''
                return button
            })
            return {
                filterButtons: newFilteredButtons
            }
        })
    }
    onFilterButtonClick = (evt) => {
        const targetButtonName = evt.target.dataset.buttonName
        this.changeFilterButtonClass(targetButtonName)
        switch (evt.target.dataset.buttonName) {
            case filterButtonsNames.all:
                this.setState(({tasks}) => {
                    return {
                        filteredTasks: [...tasks]
                    }
                })
                break
            case filterButtonsNames.active:
                this.setState(({tasks}) => {
                    const filteredTasks = tasks.filter((task) => !task.className || task.className === 'editing')
                    return {
                        filteredTasks: [...filteredTasks]
                    }
                })
                break
            case filterButtonsNames.completed:
                this.setState(({tasks}) => {
                    const filteredTasks = tasks.filter((task) => task.className === completedTaskCssClass)
                    return {
                        filteredTasks: [...filteredTasks]
                    }
                })
                break
            default:
                this.setState(({tasks}) => {
                    return {
                        filteredTasks: [...tasks]
                    }
                })
        }
    }
    deleteAllCompletedTasks = () => {
        this.setState(({tasks, filteredTasks}) => {
            const newTasks = tasks.filter((task) => task.className !== completedTaskCssClass)
            let newFilteredTasks
            if (filteredTasks) {
                newFilteredTasks = filteredTasks.filter((task) => task.className !== completedTaskCssClass)
            }
            return {
                tasks: newTasks,
                filteredTasks: newFilteredTasks || this.tasks
            }
        })
    }
    onEditButtonClick = (evt) => {
        const editButtonElement = evt.target
        this.setState(({tasks, filteredTasks}) => {
            const taskIndex = tasks.findIndex((task) => task.id === Number(editButtonElement.closest('li').dataset.id))
            tasks[taskIndex] = {
                ...tasks[taskIndex],
                className: 'editing',
                editing: true,
            }
            const updatedTask = tasks[taskIndex]
            const newTasks = [
                ...tasks.slice(0, taskIndex),
                updatedTask,
                ...tasks.slice(taskIndex + 1)
            ]
            if (filteredTasks) {
                const filteredTaskIndex = filteredTasks.findIndex((task) => task.id === Number(editButtonElement.closest('li').dataset.id))
                filteredTasks[filteredTaskIndex] = {
                    ...filteredTasks[filteredTaskIndex],
                    className: 'editing',
                    editing: true,
                }
                const updatedFilteredTask = filteredTasks[filteredTaskIndex]
                const newFilteredTasks = [
                    ...filteredTasks.slice(0, filteredTaskIndex),
                    updatedFilteredTask,
                    ...filteredTasks.slice(filteredTaskIndex + 1)
                ]
                return {
                    tasks: newTasks,
                    filteredTasks: newFilteredTasks
                }
            }
            return {
                tasks: newTasks,
                filteredTasks: this.tasks
            }
        })
    }
    onEditFieldEnterKeyDown = (evt) => {
        if (evt.key === 'Enter') {
            const editField = evt.target
            this.setState(({tasks, filteredTasks}) => {
                const taskIndex = tasks.findIndex((task) => task.id === Number(editField.closest('li').dataset.id))
                tasks[taskIndex] = {
                    ...tasks[taskIndex],
                    className: '',
                    editing: false,
                    description: editField.value
                }
                const updatedTask = tasks[taskIndex]
                const newTasks = [
                    ...tasks.slice(0, taskIndex),
                    updatedTask,
                    ...tasks.slice(taskIndex + 1)
                ]
                if (filteredTasks) {
                    const filteredTaskIndex = filteredTasks.findIndex((task) => task.id === Number(editField.closest('li').dataset.id))
                    filteredTasks[filteredTaskIndex] = {
                        ...filteredTasks[filteredTaskIndex],
                        className: '',
                        editing: false,
                        description: editField.value
                    }
                    const updatedFilteredTask = filteredTasks[filteredTaskIndex]
                    const newFilteredTasks = [
                        ...filteredTasks.slice(0, filteredTaskIndex),
                        updatedFilteredTask,
                        ...filteredTasks.slice(filteredTaskIndex + 1)
                    ]
                    return {
                        tasks: newTasks,
                        filteredTasks: newFilteredTasks
                    }
                }
                return {
                    tasks: newTasks,
                    filteredTasks: this.tasks
                }

            })
        }
    }
    render() {
        const {tasks, filteredTasks} = this.state
        const countActiveTasks = tasks.filter((task) => task.className !== completedTaskCssClass).length
        return (
            <section className="todoapp">
                <header className="header">
                    <h1>Todos</h1>
                    <NewTaskForm
                        onInputChange={this.onInputChange}
                        onSubmit={this.onSubmit}
                        inputValue={this.state.inputValue} />
                </header>
                <section className="main">
                    <TodoList
                        tasks={filteredTasks || tasks}
                        onToggleCompleted={this.onToggleCompleted}
                        onDelete={this.deleteItem}
                        onEditButtonClick={this.onEditButtonClick}
                        onEditFieldEnterKeyDown={this.onEditFieldEnterKeyDown} />
                    <Footer
                        countActiveTasks={countActiveTasks}
                        filterButtons={this.state.filterButtons}
                        onFilterButtonClick={this.onFilterButtonClick}
                        deleteAllCompletedTasks={this.deleteAllCompletedTasks} />
                </section>
            </section>
        )
    }
}
