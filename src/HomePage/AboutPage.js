import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'
import AboutContent from "./AboutContent.js"

const useStyles = makeStyles((theme) => ({
    content: {
        minHeight: "95%", //Change minHeight and maxHeight to adjust the height of the about page
        maxHeight: "95%",
        display:"flex",
        justifyContent:"space-around"
        
    },

// footer:{
//   color: "white",
//   textAlign: "center",
//   display:"flex",
//   justifyContent:"space-around",
//   padding: "10px"
// }
}));


function AboutPage() {

    const classes = useStyles();

    return (
        <>
        <Box className= {classes.content} >
                <AboutPage/> 
        </Box> 


        {/* If you want a footer (remember to adjust Height above!)
        
        <Box className={classes.footer}>
            * INSERT CONTENT HERE *
            <GitHubIcon/>
            <Typography> Team Ezcalate 2020</Typography>
            
        </Box> */}
        </>
    )
}

export default AboutPage;