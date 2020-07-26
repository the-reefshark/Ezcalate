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
        flexDirection: "column",
    },
    bar: {
        order:"0",
        flexGrow:"1" 
    },
    lower: {
        order:"1",
        flexGrow:"2", //Change this to change the size of the bar chart
        display:"flex",
        flexDirection:"row",
        paddingTop: "20px",
        
    },
    tableitem: {
        order:"1",
        flexGrow:"7",
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingTop: "15px",
        maxHeight: "90%",
        border: "solid grey 1px"

    },
    header: {
        justifyContent: "flex-start",
        display: "flex", 
        paddingRight: "20%",
        flexDirection: "row",
        paddingBottom:"10px"
        
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
            <Box className={classes.bar} >
                <BarChart user={ props.user } />
            </Box>

            <Box className={classes.lower}>
                <Box className={classes.tableitem} borderRadius={16}>
                    <div>
                        {tableItems ? (tableItems.length === 0 ? 'No tasks to display' :
                        [<Box key="TableHeader" className = {classes.header}>
                            <Box width="30%"><b>Time</b></Box> 
                            <Box width="50%"><b>Task Name</b></Box>
                            <Box width="20%"><b>Grouping</b></Box>
                            </Box>,  
                            tableItems]
                        ) :
                        'Cannot connect to server!'}
                    </div>
                </Box>

                <Box order="1" flexGrow="1" padding="30px" justifyContent="center" >
                        <DoughnutChart user={ props.user } />
                </Box>
            </Box>

        </Box>
    )
}

export default MainVisualiser