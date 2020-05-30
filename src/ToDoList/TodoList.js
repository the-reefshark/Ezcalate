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
        console.log(new_data["rows"])
        if (new_data["rows"] === undefined) {
            this.setState({
                todos: null,
                add: ""
            })
        }
        else {
            this.setState({
                todos: new_data["rows"],
                add: ""
            })
            }
     }
    

    getTodoList = () => {
        fetch('http://localhost:3001')
            .then(response => { return response.text() })
            .then(data => { this.setTodoList(data) })
    }

    handleAdd = event => {
        event.preventDefault();
        const newTodo = {
            id: this.state.todos === null ? 0 : this.state.todos.length - 1, //somehow changing + 1 to - 1 works and doesnt screw up add
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
            this.getTodoList()
        })

        //Add new entry
        fetch('http://localhost:3001/tododata', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, text, completed }),
        })
        .then(response => { return response.json })
        .then(() => {
            this.getTodoList()
        })
    }

    handleClick = id => {
        const updatedTodos = this.state.todos.filter(todo => todo.id !== id)
        this.setState({ todos: updatedTodos })

        fetch(`http://localhost:3001/tododata/${id}`, {
            method: 'DELETE' })
        .then(response => { return response.json })
        .then(() => {
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
                {todoItems ? (todoItems.length === 0 ? 'Add something using the box above!' : todoItems) : 'Cannot connect to server!'}
            </div>
        )
    }
}

export default TodoList