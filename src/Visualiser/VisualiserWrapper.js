import React from "react"
import { makeStyles } from '@material-ui/core/styles'

import MainVisualiser from "./MainVisualiser"
import Box from "@material-ui/core/Box"

import ToDoImage from "../Background Images/coffeeshop1.jpg"


const useStyles = makeStyles((theme) => ({
    visualiser_page: {
        // backgroundImage: `url(${ToDoImage})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        width: '100vw',
        height: '100vh', 
        paddingTop: "100px"
    },

    main: {
        display:"flex",
        justifyContent:"space-around",
        height: "100%"

    }
}));

function VisualiserWrapper(props){
    const classes = useStyles();

    
    return (
        <div className={classes.visualiser_page}>
            <Box className={classes.main}>
                <MainVisualiser {...props}/>
            </Box>
        </div>
    )

}

export default VisualiserWrapper 