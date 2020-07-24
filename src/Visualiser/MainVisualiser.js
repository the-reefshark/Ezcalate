import React, { useState, useEffect } from 'react'

import TableItem from './TableItem'

function MainVisualiser(props) {
    const [todos, setTodos] = useState(null)
    const [sort_by, setSortby] = useState("All")
    const [tableItems, setTableItems] = useState(null)

    useEffect(() => {
        getTodoList()
    })

    // Updates the filter parameter when sidebar button is pressed and forces an update of the TodoList
    function updateFilterParams(text) {
        setSortby(text)
    }

    // Sends fetch request to obtain a list of TodoList items ordered by given param
    function getTodoList() {
        fetch(`http://localhost:3001/sorted/${sort_by}`)
            .then(response => { return response.text() })
            .then(data => setTodoList(data))
    }

    // Parses the data and updates the state after getTodoList executes
    function setTodoList(data) {       
        const new_data = JSON.parse(data) 

        if (new_data["rows"].length === 0 ) {
            setTodos([])
        }
        else {
            setTodos(new_data["rows"])
        }

        setTableItems(todos === null ? null : todos.map(item =>
            <TableItem key={item.id} item={item} />
        ))
    }

    return(
        <div>
        {tableItems ? (tableItems.length === 0 ? 'No tasks to display' :
        [<div key="TodoHeader" className ="todo-header">
            <p><b>Time</b></p> 
            <p><b>Task Name</b></p>
            </div>,  
            tableItems]
        ) :
        'Cannot connect to server!'}
        </div>
    )
}

export default MainVisualiser