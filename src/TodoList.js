import React from "react"

import TodoItem from "./TodoItem"
import todosData from "./todosData"

class TodoList extends React.Component {
    constructor() {
        super()
        this.state = {
            todos: todosData
        }
    }
    
    handleChange = id => {
        this.setState(prevState => {
            const updatedTodos = prevState.todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed
                }
                return todo
            })
            return {
                todos: updatedTodos
            }
        })
    }

    render() {
        // Restructure incoming data array
        const todoItems = this.state.todos.map(item => <TodoItem key={item.id} item={item}
            handleChange={this.handleChange} />)
        return (
            <div>
                {todoItems}
            </div>
        )
    }
}

export default TodoList