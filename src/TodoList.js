import React from "react"

import TodoItem from "./TodoItem"
import todosData from "./todosData"

class TodoList extends React.Component {
    constructor() {
        super()
        this.state = {
            todos: todosData,
            add: ""
        }
    }

    handleAdd = event => {
        event.preventDefault();
        const newTodo = {
            id: this.state.todos.length + 1,
            text: this.state.add,
            completed: false
        }
        const updatedTodos = [...this.state.todos, newTodo]
        this.setState({ todos: updatedTodos, add: "" })
    }

    handleAddBox = event => {
        this.setState({add: event.target.value})
    }

    handleChange = id => {
        const updatedTodos = this.state.todos.map(todo => {
          if (todo.id === id) {
            todo.completed = !todo.completed
          }
          return todo
        })
        this.setState({ todos: updatedTodos })
    }

    handleClick = id => {
        const updatedTodos = this.state.todos.filter(todo => todo.id !== id)
        this.setState({ todos: updatedTodos })
    }

    render() {
        // Restructure incoming data array
        const todoItems = this.state.todos.map(item => <TodoItem key={item.id} item={item}
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
                {todoItems}
            </div>
        )
    }
}

export default TodoList