import React from "react"
import TodoList from "../ToDoList/TodoList.js"

function MidPanel(props) {
    return (
        <TodoList user={ props.user }/>
    )
}

export default MidPanel