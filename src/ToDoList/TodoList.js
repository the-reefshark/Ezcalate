import React from "react"
import LeftPanel from "./LeftPanel.js"
import TodoItem from "./TodoItem"
import ToDoFormModal from "./TodoFormModal"
import Description from "../vert_layout/RightPanel/Description.js"
import Timer from "../vert_layout/RightPanel/Timer.js"

import Box from '@material-ui/core/Box';

class TodoList extends React.Component {
    constructor() {
        super()
        this.state = {
            // States for ToDoList
            todos: null,
            add: "",
            details: "",
            activity_type: "",
            duedate: "",
            dateCompleted: null,
            sort_by: "All",

            // Additional states for the Description Panel
            isClicked: false,  // checks whether the Description Panel button was clicked
            CurrentTime: "0", // the current time on the timer for the current toDoItem
            currentDescription: null // todoitem used in the Description Panel
        }
    }

    // Updates the filter parameter when sidebar button is pressed and forces an update of the TodoList
    updateFilterParams = text => {
        this.setState(
            {
                sort_by: text
            },
            () => {this.getTodoList()}
        )
    }

    // Gets TodoList data as soon as application runs
    componentDidMount() {
        this.getTodoList();
    }

    // Parses the data and updates the state after getTodoList executes
    setTodoList = data => {       
        const new_data = JSON.parse(data) 
        console.log(new_data["rows"]) // REMOVE
        if (new_data["rows"].length === 0) { // Updated this to use length because it is more accurate
            this.setState({
                todos: [],
                completedTodos: [],
                add: "",
                isClicked: false // When todolist is empty, description panel will be cleared
            })
        }
        else {
            // console.log(new_data["rows"].length)
            // var available_tasks = [];
            //     var completed_tasks = [];

            // for (var i = 0; i < new_data["rows"].length; i++) {
            //     console.log(new_data["rows"][i])
                
            

            //     if (new_data["rows"][i]["completed"] === false) {
            //         console.log(new_data["rows"][i])
            //         available_tasks.push(new_data["rows"][i]);
                    
            //     }

            //     else {
            //         console.log(new_data["rows"][i])
            //         completed_tasks.push(new_data["rows"][i])
            //     }
            // }

            this.setState({
                todos: new_data["rows"],
                
                add: ""
            })
        }
    }

    /*
        Sends fetch request to obtain a list of TodoList items ordered by their index
    */
    getTodoList = () => {
        fetch(`http://localhost:3001/sorted/${this.state.sort_by}`)
            .then(response => { return response.text() })
            .then(data => { this.setTodoList(data) })
    }

    // Creates an item with the given information and adds it into the database
    handleAdd = () => {
        const newTodo = {
            id: -1, // Arbitrary number that will be overridden upon the next get request
            task_name: this.state.add,
            details: this.state.details,
            activity_type: this.state.activity_type,
            completed: false,
            duedate: this.state.duedate,
            dateCompleted: null,
            timer: 0 // Doesn't get passed into the database, database sets default of 0
        }

        /*
            If there were no items in the todolist create a new array with the given item otherwise
            add the new item to the existing array
        */
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

    // Updates iternal state and database based on any changes made by the user in the description panel
    handleChange = id => {
        let newTodo // Gets assigned the value of the TodoItem that was modified
        const updatedTodos = this.state.todos.map(todo => {
            if (todo.id === id) {
                newTodo = todo
            }
            return todo
        })

        this.setState({ todos: updatedTodos })
        const { task_name, details, completed, activity_type, duedate, dateCompleted, timer } = newTodo

        fetch(`http://localhost:3001/tododata/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, task_name, details, completed, activity_type, duedate, dateCompleted, timer })
        })
        .then(response => { return response.json })
        .then(() => {
            this.getTodoList()
        })
    }

    // Removes the TodoItem with the given id from internal state and database
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

    // Function that handles the "submit button" in the AddTask form
    onSubmit = data => {
        if (data.constructor.name === 'SyntheticEvent') {
            // Do Nothing
        } else {
            this.setState(
                {add: data["TaskName"],
                details: data["Details"],
                activity_type: data["activity_type"],
                duedate: data["DueDate"],
                dateCompleted: null
                }, 
                () => {this.handleAdd()}
            )
        }
    }

    onDetails = id => { // Function that handles the "View Description of Task" Button
        // Pulls out the required TodoLitem
        var CurrentToDo = this.state.todos.filter(item => id === item["id"])
        
        // Initially when Description Panel has no todoitem
        if (this.state.currentDescription === null) {
            this.setState({
                isClicked: true,
                currentDescription: CurrentToDo})

        // Toggles the Description Panel on and off
        } else if (id === this.state.currentDescription["0"]["id"]) {
            this.setState( {isClicked: !this.state.isClicked} )

        // Switches from one task to another in the Description Panel
        } else {
            this.setState( {currentDescription: CurrentToDo} )
        }  
    }
        
    // Function that handles the action of clicking the checkbox
    handleCheck = event => {
        let id = parseInt(event.target.id, 10)
        let newTodo
        const updatedTodos = this.state.todos.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed
                if (todo.dateCompleted === undefined) {
                    todo.dateCompleted = new Date().toISOString().slice(0,10); 
                }
                newTodo = todo
            }
            return todo
        })

        console.log("LOOK HERE")
        console.log(newTodo)

        this.setState({ todos: updatedTodos })
        const { task_name, details, completed, activity_type, duedate, dateCompleted, timer } = newTodo

        console.log(duedate)

        fetch(`http://localhost:3001/tododata/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, task_name, details, completed, activity_type, duedate, dateCompleted, timer })
        })
        .then(response => { return response.json })
        .then(() => {
            this.getTodoList()
        })
    }

    // Function that handles when you edit the Description Panel
    handleDetails = (id, currentTask, currentDetail) => {
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
        const todoItems = this.state.todos === null ? null : this.state.todos.map(item =>
            <TodoItem key={item.id} item={item} handleChange={this.handleChange} handleClick={this.handleClick}
                onDetails = {this.onDetails} handleCheck = {this.handleCheck}/>
        )

        console.log(todoItems)

        return (
            <div>
                <LeftPanel changeParams = {this.updateFilterParams} />

                <Box
                    display="flex"
                    flexWrap="nowrap"
                    justifyContent="space-between"
                    // border="solid black"
                >

                <Box className="todo-list" borderRadius={16} height="auto">
                    <Box>
                        <p><ToDoFormModal onSubmit = {this.onSubmit} /></p>
                    </Box>
                    <Box>
                    <div>
                        {todoItems ? (todoItems.length === 0 ? 'Add items using the box above!' :
                            [<p className ="todo-section1"><b><u>Available Tasks</u></b></p>,
                            <div className ="todo-header">
                                <p><b>Due date</b></p> 
                                <p><b>Task Name</b></p>
                                </div>,  
                                todoItems]
                            ) :
                            'Cannot connect to server!'}
                    </div>
                    </Box>
                </Box>

                <Box flexGrow="1"  >
                    <div className="rightpanel">
                        {this.state.isClicked ?
                        <Description currentDescription = {this.state.currentDescription} handleChange = {this.handleDetails}
                            isClicked = {this.state.isClicked} />
                        : null}
                        
                        {/* <Timer CurrentTime={this.state.CurrentTime}/> */}
                    </div>
                </Box>
            </Box>
        </div>
        )
    }
}

export default TodoList