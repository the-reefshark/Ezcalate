import React, { useState, useEffect } from 'react'

import TableItem from './TableItem'
import BarChart from './BarChart'

function MainVisualiser(props) {
    const [sort_by, setSortby] = useState(()=> {return "All"})
    const [tableItems, setTableItems] = useState(()=> {return null})

    useEffect(() => {
        console.log("BEFORE SETTING:" + JSON.stringify(tableItems))
        getTodoList()
    }, [!tableItems])

    // Updates the filter parameter when sidebar button is pressed and forces an update of the TodoList
    function updateFilterParams(text) {
        setSortby(text)
    }

    // Sends fetch request to obtain a list of TodoList items ordered by given param
    function getTodoList() {
        console.log("RUNNING")
        return fetch(`http://localhost:3001/sorted/${props.user["nickname"]}/${sort_by}`)
            .then(response => { return response.text() })
            .then(data => setTodoList(data))
    }

    // Parses the data and updates the state after getTodoList executes
    function setTodoList(data) {
        const new_data = JSON.parse(data)[1]["rows"]

        console.log((new_data))
        console.log((tableItems))
        console.log((tableItems))
    

        setTableItems(new_data.length === 0 ? null : new_data.map(item =>
            <TableItem key={item.id} item={item} />
        ))

        console.log("AFTER SETTING:" + JSON.stringify(tableItems))
    }

    return(
       

        // <div>
        //     <BarChart/>
        // </div>



        

        // CORRECT TABLEITEM CODE
        <div marginTop="100px">
            {tableItems ? (tableItems.length === 0 ? 'No tasks to display' :
            [<div key="TableHeader" className ="table-header">
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