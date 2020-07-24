import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'
import AboutContent from "./AboutContent.js"

import LoginImage from "../Background Images/CoffeeLogin2.jpg"


const useStyles = makeStyles((theme) => ({
    content: {
        minHeight: "95%", //Change minHeight and maxHeight to adjust the height of the about page
        maxHeight: "95%",
        display:"flex",
        justifyContent:"space-around"
        
    },
    loginpage: {
        backgroundImage: `url(${LoginImage})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        width: '100vw',
        height: '100vh',
        paddingTop: "100px",
        display:"flex",
        flexFlow:"column",
        justifyContent:"space-between"
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
        <div className={classes.loginpage}>
        <Box className= {classes.content} >
            <AboutContent /> 
        </Box> 
        </div>


        {/* If you want a footer (remember to adjust Height above!)
        
        <Box className={classes.footer}>
            * INSERT CONTENT HERE *
            <GitHubIcon/>
            <Typography> Team Ezcalate 2020 </Typography>
            
        </Box> */}
        </>
    )
}

export default AboutPage;