import React from 'react';
import ReactDOM from 'react-dom'
import Header from './components/header/header.js';
import Main from './components/main/main.js';
const rootElement = document.getElementById('root')

const App = () => {
    return (
        <section className="todoapp">
            <Header />
            <Main />
        </section>
    )
}

ReactDOM.render(<App />, rootElement)