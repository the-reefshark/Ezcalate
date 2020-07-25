import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';


import Box from '@material-ui/core/Box'
import TableItem from './TableItem'
import BarChart from './BarChart'
import DoughnutChart from './DoughnutChart'

const useStyles = makeStyles((theme) => ({
    visualiser: {
        width: "95%",
        display: "flex",
        border: "solid red",
        flexDirection: "column",
    },
    tableitem: {
        textAlign: "center"

    }
}));


function MainVisualiser(props) {
    const [sort_by, setSortby] = useState(()=> {return "All"})
    const [tableItems, setTableItems] = useState(()=> {return null})

    useEffect(() => {
        console.log(tableItems)
        getTodoList()
    }, [!tableItems])

    // Updates the filter parameter when sidebar button is pressed and forces an update of the TodoList
    function updateFilterParams(text) {
        setSortby(text)
    }

    // Sends fetch request to obtain a list of TodoList items ordered by given param
    function getTodoList() {
        return fetch(`http://localhost:3001/sorted/${props.user["nickname"]}/${sort_by}`)
            .then(response => { return response.text() })
            .then(data => setTodoList(data))
    }

    // Parses the data and updates the state after getTodoList executes
    function setTodoList(data) {
        const new_data = JSON.parse(data)[1]["rows"]

        setTableItems(new_data.length === 0 ? null : new_data.map(item =>
            <TableItem key={item.id} item={item} />
        ))
    }

    const classes = useStyles();


    return(

        <Box className={classes.visualiser}>
            <Box border = "solid blue" order="1" flexGrow="1">
                <div width={500} height={1000} >
                    <BarChart/>
                </div>
            </Box>

            <Box className={classes.tableitem}
            order="2" border="solid blue"  flexGrow="3" display="flex" flexDirection="row">
                <Box order="0" flexGrow="2">
                    <div>
                        {tableItems ? (tableItems.length === 0 ? 'No tasks to display' :
                        [<div key="TableHeader" className ="todo-header">
                            <p><b>Time</b></p> 
                            <p><b>Task Name</b></p>
                            <p><b>Grouping</b></p>
                            </div>,  
                            tableItems]
                        ) :
                        'Cannot connect to server!'}
                    </div>
                </Box>

                <Box order="1" flexGrow="1" border="solid green" display="flex">
                    <div>
                        <DoughnutChart />
                    </div>
                </Box>
            </Box>

        </Box>
    )
}

export default MainVisualiser