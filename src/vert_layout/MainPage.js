import React from "react"
import MidPanel from "./MidPanel"

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

// Background Image (change as necessary)
import ToDoImage from "../Background Images/coffeeshop1.jpg"

const useStyles = makeStyles((theme) => ({
    todolist_page: {
        backgroundImage: `url(${ToDoImage})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        width: '100vw',
        height: '100vh'
    },

    midpanel:{
        width: "100%",
        // float: "left",
        height: "100%",
    }
  }));

function MainPage() {

    const classes = useStyles();

    return (
        <div className={classes.todolist_page}>
            <Box className={classes.midpanel} >
                <MidPanel />
            </Box>
        </div>
    )
}

export default MainPage