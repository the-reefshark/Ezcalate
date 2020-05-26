import React from "react"
import ToDoList from "./TodoList"



class ToDoListAll extends React.Component {
    
Hello() {
    console.log('In ToDOLISTALL')
}
    render() {
        return (
            <div>
            Hello
            
            <ToDoList/>
          </div>
        )
    }
}

export default ToDoListAll;