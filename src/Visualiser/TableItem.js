import React from 'react'
import { makeStyles } from '@material-ui/core/styles';


import Box from '@material-ui/core/Box'

function TableItem(props) {
    return (
        <Box
        border="solid black"
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
        >
            <Box         border="solid red"
 order="1" >
                <p className="date">{(props.item.timer)}</p>
            </Box>

            <Box order="2"         border="solid blue"
>
                <p className="taskName"> {props.item.task_name} </p>
            </Box>

            <Box order="3"         border="solid yellow"
>
                <p className="group"> {props.item.activity_type} </p>
            </Box>
        </Box>
    )
}

export default TableItem