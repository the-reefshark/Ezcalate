import React from "react"

import TodoItem from "./TodoItem"
import todosData from "./todosData"

class TodoList extends React.Component {
    constructor() {
        super()
        this.state = {
            todos: null,
            add: ""
        }
    }

    componentDidMount() {
        this.getTodoList();
    }

    setTodoList = data => { 
        
        const new_data = JSON.parse(data) 
        
        // basically data returned was a long ass string, hence the rendering below (map part) failed cuz you can't 
        // map a string. hence the conversion to json and yup. 
        
        this.setState({
            todos: new_data["rows"],
            add: ""
        })
        
    }

    getTodoList = () => {
        fetch('http://localhost:3001')
            .then(response => { return response.text() })
             // TEST CODE
            .then(data => { this.setTodoList(data) })
    }

    handleAdd = event => {
        event.preventDefault();
        const newTodo = {
            id: this.state.todos === null ? 0 : this.state.todos.length - 1,
            text: this.state.add,
            completed: false
        }
        const updatedTodos = this.state.todos === null ? [newTodo] : [...this.state.todos, newTodo]
        this.setState({ todos: updatedTodos, add: "" })

        const id = this.state.todos === null ? 0 : this.state.todos.length + 1
        const text = this.state.add
        const completed = false

        fetch('http://localhost:3001/tododata', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, text, completed }),
        })
        .then(response => { return response.json })
        .then(data => {
            console.log(data) // TEST CODE
            this.getTodoList()
        })
    }

    handleAddBox = event => {
        this.setState({ add: event.target.value })
    }

    handleChange = id => {
        let text
        let completed
        const updatedTodos = this.state.todos.map(todo => {
          if (todo.id === id) {
            todo.completed = !todo.completed
            text = todo.text
            completed = todo.completed
          }
          return todo
        })
        this.setState({ todos: updatedTodos })

        //Delete old entry
        fetch(`http://localhost:3001/tododata/${id}`, {
            method: 'DELETE' })
        .then(response => { return response.json })
        .then(data => {
            console.log(data) // TEST CODE
            this.getTodoList()
        })

        //Add new entry
        fetch('http://localhost:3001/tododata', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, text, completed }),
        })
        .then(response => { return response.json })
        .then(data => {
            console.log(data) // TEST CODE
            this.getTodoList()
        })
    }

    handleClick = id => {
        const updatedTodos = this.state.todos.filter(todo => todo.id !== id)
        this.setState({ todos: updatedTodos })

        fetch(`http://localhost:3001/tododata/${id}`, {
            method: 'DELETE' })
        .then(response => { return response.json })
        .then(data => {
            console.log(data) // TEST CODE
            this.getTodoList()
        })
    }

    render() {
        // Restructure incoming data array
        const todoItems = this.state.todos === null ? null : this.state.todos.map(item => <TodoItem key={item.id} item={item}
            handleChange={this.handleChange} handleClick={this.handleClick} />)
        return (
            <div className="todo-list">
                <form onSubmit={this.handleAdd}>
                    <input
                        type="text"
                        name="newTodo"
                        value={this.state.add}
                        onChange={this.handleAddBox}
                    />
                    <button> Add </button>
                    <br />
                </form>
                {todoItems ? todoItems : 'Add items using the add box above!'}
            </div>
        )
    }
}

export default TodoList