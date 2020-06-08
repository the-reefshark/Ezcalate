import React from "react"
import TodoItem from "./TodoItem"
import ToDoFormModal from "./TodoFormModal"
import Description from "../vert_layout/RightPanel/Description.js"
import Timer from "../vert_layout/RightPanel/Timer.js"


class TodoList extends React.Component {
    constructor() {
        super()
        this.state = {
            // For the actual ToDoList
            todos: null,
            add: "",
            details: "",
            activity_type: "",
            duedate: "",
            dateCompleted: null,

            // Additional states for the Description Panel
            DidyouClick: false, // this state checks whether the checkbox was clicked
            isClicked: false,  // this state checks whether the Description Panel button was clicked
            isTimer: false,    // Haven't coded this out yet ps
            currentDescription: null // this state is the todoitem object used in the Description Panel
        }
    }

    componentDidMount() {
        this.getTodoList();
    }

    setTodoList = data => {       
        const new_data = JSON.parse(data) 
        console.log(new_data["rows"])
        if (new_data["rows"].length === 0) { // Updated this to use length because it is more accurate
            this.setState({
                todos: [],
                add: "",
                isClicked: false // When todolist is empty, description panel will be cleared
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

        const updatedTodos = this.state.todos.length === 0 ? 
        [newTodo] : [...this.state.todos, newTodo]

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


    handleChange = id => { // Updated HandleChange as follows:
        let newTodo
        const updatedTodos = this.state.todos.map(todo => {
          if (todo.id === id) {
              if (this.state.DidyouClick === true) { // Checks if checkbox was clicked
                    todo.completed = !todo.completed
                    this.setState({DidyouClick : false}) // Reverts the state back to false (it will become true for AN INSTANCE when someone clicks the checkbox)
              }
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


    onSubmit = data => { // Basically the function that handles the "submit button" in the AddTask form
        
        if (data.constructor.name === 'SyntheticEvent') {}

        else {
            this.setState(
                {add: data["TaskName"],
                details: data["Details"],
                activity_type: data["activity_type"],
                duedate: data["DueDate"],
                dateCompleted: null
                }, 
                () => {this.handleAdd()})
        }
    }

    onDetails = id => { // Basically the function that handles the "View Description of Task" Button
        
        var CurrentToDo = this.state.todos.filter(item => id === item["id"])
        
        if (this.state.currentDescription === null) { //Initially when Description Panel has no todoitem
            this.setState({
                isClicked: true,
                currentDescription: CurrentToDo})    
            }
        
        else if (id === this.state.currentDescription["0"]["id"]) { //This is to toggle the Description Panel on and off
            this.setState(
                {isClicked: !this.state.isClicked})
            }

        else { // This is to switch from one task to another in the Description Panel
            this.setState({
                currentDescription: CurrentToDo})   
            }  
    }
        


    handleCheck = id => { // Function that handles when you click the checkbox
        this.setState(
            {DidyouClick: true})
    }


    handleDetails = (id, currentTask, currentDetail) => { // Function that handles when you edit the Description Panel
        this.state.todos.map(todo => {
            if (todo.id === id) {
                todo.task_name = currentTask
                todo.details = currentDetail
            }
            return todo
        })

        this.handleChange(id);
    }
    
   

    render() {
        // Restructure incoming data array
        const todoItems = this.state.todos === null ? null : this.state.todos.map(item => <TodoItem key={item.id} item={item}
            handleChange={this.handleChange} handleClick={this.handleClick} onDetails = {this.onDetails} handleCheck = {this.handleCheck}/>)
            
            console.log(this.state.isClicked)
       
            return (
            <div>
                <div className="todo-list">
                <p><ToDoFormModal onSubmit = {this.onSubmit} /></p>
                {todoItems ? (todoItems.length === 0 ? 'Add items using the box above!' : todoItems) : 'Cannot connect to server!'} 
                </div>
                <div className="rightpanel">
                    {this.state.isClicked ? 
                    <Description currentDescription={this.state.currentDescription} handleChange= {this.handleDetails} /> : null}
                    {this.state.isTimer ? <Timer /> : null}
                    
                </div>
            </div>
         
        )
    }
}

export default TodoList