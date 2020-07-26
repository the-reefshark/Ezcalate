import React from 'react'
import { makeStyles } from '@material-ui/core/styles';


import Box from '@material-ui/core/Box'

function TableItem(props) {
    return (
        <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="center"
            borderBottom="solid grey 1px">

            <Box width="24%">
                <p className="date">{Math.round((props.item.timer / 60) * 100) / 100}</p>
            </Box>

            <Box width="40%">
                <p className="taskName"> {props.item.task_name} </p>
            </Box>

            <Box width="36%"
>
                <p className="group"> {props.item.activity_type} </p>
            </Box>
        </Box>
    )
}

export default TableItem