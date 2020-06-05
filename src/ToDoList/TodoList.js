import React from "react"
import TodoItem from "./TodoItem"
import ToDoFormModal from "./TodoFormModal"


class TodoList extends React.Component {
    constructor() {
        super()
        this.state = {
            todos: null,
            add: "",
            details: "",
            activity_type: "",
            duedate: "",
            dateCompleted: null
        }
    }

    componentDidMount() {
        console.log(this.state.todos) // REMOVE
        this.getTodoList();
    }

    setTodoList = data => {       
        const new_data = JSON.parse(data) 
        console.log(new_data["rows"]) // REMOVE
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
            console.log(this.state.todos) // REMOVE
        }
     }
    
    getTodoList = () => {
        fetch('http://localhost:3001')
            .then(response => { return response.text() })
            .then(data => { this.setTodoList(data) })
    }

    handleAdd = () => {
       
        console.log("TYPE: " + this.state.activity_type) // CHECK HERE FOR TYPE

        const newTodo = {
            id: -1, // Arbitrary number that will be overridden upon the next get request
            task_name: this.state.add,
            details: this.state.details,
            activity_type: this.state.activity_type, // CHANGE RHS FOR TYPE
            completed: false,
            duedate: this.state.duedate,
            dateCompleted: null
        }

        console.log(newTodo) // REMOVE

        console.log(this.state.todos) // REMOVE

        const updatedTodos = this.state.todos.length === 0 ? 
        [newTodo] : [...this.state.todos, newTodo]

        console.log(updatedTodos) // REMOVE

        this.setState({ 
            todos: updatedTodos, 
            add: "",  
            details: "",
            activity_type: "",
            duedate: "",
            dateCompleted: null 
        })

        const { task_name, details, activity_type, completed, duedate, dateCompleted } = newTodo

        fetch('http://localhost:3001/tododata', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task_name, details, completed, activity_type, duedate, dateCompleted })
        })
        .then(response => { return response.json })
        .then(data => {
            this.getTodoList()
        })    
    }

    handleChange = id => {
        let newTodo
        const updatedTodos = this.state.todos.map(todo => {
          if (todo.id === id) {
            todo.completed = !todo.completed
            newTodo = todo
          }
          return todo
        })

        this.setState({ todos: updatedTodos })
        const { task_name, details, completed, activity_type, duedate, dateCompleted } = newTodo

        fetch(`http://localhost:3001/tododata/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, task_name, details, completed, activity_type, duedate, dateCompleted })
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


    onSubmit = data => {
        console.log(data)
        
        console.log(this.state.todos)
        console.log(data instanceof Event)

        if (data.constructor.name === 'SyntheticEvent') {
        }

        else{
        this.setState(
            {add: data["TaskName"],
             details: data["Details"],
             activity_type: data["activity_type"],
             duedate: data["DueDate"],
             dateCompleted: null
            }, 
            () => {this.handleAdd()})
        console.log(this.state.todos)
        }
    }


    render() {
        // Restructure incoming data array
        const todoItems = this.state.todos === null ? null : this.state.todos.map(item => <TodoItem key={item.id} item={item}
            handleChange={this.handleChange} handleClick={this.handleClick} />)
        return (
            <div className="todo-list">
            <ToDoFormModal onSubmit = {this.onSubmit} />
                {todoItems ? (todoItems.length === 0 ? 'Add items using the box above!' : todoItems) : 'Cannot connect to server!'}
            </div>
        )
    }
}

export default TodoList