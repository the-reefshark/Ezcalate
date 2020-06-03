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
            activitytype: "",
            duedate: "",
            dateCompleted: null
        }
    }

    componentDidMount() {
        console.log(this.state.todos)
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
            console.log(this.state.todos)
            }
     }
    

    getTodoList = () => {
        fetch('http://localhost:3001')
            .then(response => { return response.text() })
            .then(data => { this.setTodoList(data) })
    }

    handleAdd = () => {
        const newTodo = {
            id: this.state.todos === null ? 0 : this.state.todos.length + 1,
            text: this.state.add,
            details: this.state.details,
            type: this.state.activitytype,
            completed: false,
            duedate: this.state.DueDate,
            dateCompleted: null
        }

        console.log(newTodo)

        console.log(this.state.todos)

        const updatedTodos = this.state.todos.length === 0 ? 
        [newTodo] : [...this.state.todos, newTodo]

        console.log(updatedTodos)

        
        this.setState({ 
            todos: updatedTodos, 
            add: "",  
            details: "",
            activitytype: "",
            duedate: "",
            dateCompleted: null })

            const id = this.state.todos === null ? 0 : this.state.todos.length + 1
            const text = newTodo.text
            const details = newTodo.details
            const type = newTodo.type
            const completed = false
            const duedate = null
            const dateCompleted = null



        fetch('http://localhost:3001/tododata', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, text, details, completed, type, duedate })
        })
        .then(response => { return response.json })
        .then(data => {
            this.getTodoList()
        })
    
        
    }

    handleChange = id => {
        let text
        let completed
        const updatedTodos = this.state.todos.map(todo => {
          if (todo.id === id) {
            todo.completed = !todo.completed
            text = todo.task_name
            completed = todo.completed
          }
          return todo
        })
        this.setState({ todos: updatedTodos })

        //Delete old entry
        fetch(`http://localhost:3001/tododata/${id}`, {
            method: 'DELETE' })
        .then(response => { return response.json })

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
             activitytype: data["activitytype"],
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