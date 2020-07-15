import React from "react"
import MidPanel from "./MidPanel"
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    midpanel:{
        width: "100%",
        // float: "left",
        height: "100%",
    },
  }));

function MainPage() {

    const classes = useStyles();

    return (
        <div>
            <Box className={classes.midpanel} >
                <MidPanel />
            </Box>
        </div>
    )
}

export default MainPage