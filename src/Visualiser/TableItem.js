import React from 'react'

import Box from '@material-ui/core/Box'

function TableItem(props) {
    return (
        <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="center"
        >
            <Box order="1" flexGrow="1"  whiteSpace="nowrap" justifyContent="center">
                <p className="date">{"  " + (props.item.timer)}</p>
            </Box>

            <Box order="2">
                <p className="taskName"> {props.item.task_name} </p>
            </Box>

            <Box order="3">
                <p className="group"> {props.item.activity_type} </p>
            </Box>
        </Box>
    )
}

export default TableItem