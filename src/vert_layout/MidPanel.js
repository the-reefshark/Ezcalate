import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import TodoList from "../ToDoList/TodoList.js"

const useStyles = makeStyles((theme) => ({
    root: {
      
        backgroundColor: "rgba(255,255,255, 0)"
    }
    
  }));

function MidPanel() {
    const classes = useStyles();

    return (
        // <div className={classes.root}>
        <TodoList />
        // </div>
    )
}

export default MidPanel