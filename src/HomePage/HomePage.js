import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

// Background Image (change as necessary)
import LoginImage from "../Background Images/CoffeeLogin2.jpg"
import { getThemeProps } from "@material-ui/styles"

const useStyles = makeStyles((theme) => ({
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

    content: {
       color: "white",
       paddingLeft: "5%",
       paddingTop: "10.5%",
    },

    main:{
        color: "white",
        fontSize: "75px",
        textShadow: "-1px 0 grey, 0 1px grey, 1px 0 grey, 0 -1px grey;"
    },

    words: {
        color: "white",
        fontSize: "30px",
        paddingTop:"5px"

    },
    button:{
        marginTop:"30px",
        fontSize: "30px",
        color: "grey",
        border:"solid white",
        backgroundColor: "white",
        borderRadius:"16px"

    }

// footer:{
//   color: "white",
//   textAlign: "center",
//   display:"flex",
//   justifyContent:"space-around",
//   padding: "10px"
// }
}));


function HomePage(props) {

    const classes = useStyles();

    return (
        <div className={classes.loginpage}>
            <Box display="flex" height="100%">
                <Box className={classes.content} width="70%" flexGrow="1">
                    <Typography className={classes.main}> Are you wasting your life? </Typography>
                    <Typography className={classes.main}> Stay productive with us! </Typography>
                    <Typography className={classes.words}>Millions of people have already joined us! What are you waiting for?</Typography>
                    <Button className={classes.button} onClick={props.loginWithRedirect}>
                        Get Started - It's Free!
                    </Button>
                </Box>
            </Box>

            {/* If you want a footer (remember to adjust Height above!)
            
            <Box className={classes.footer}>
                * INSERT CONTENT HERE *
                <GitHubIcon/>
                <Typography> Team Ezcalate 2020</Typography>
                
            </Box> */}
        </div>
    )
}

export default HomePage;