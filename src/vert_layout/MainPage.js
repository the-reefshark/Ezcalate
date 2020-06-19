import React, {useState} from "react"

import LeftPanel from "./LeftPanel"
import MidPanel from "./MidPanel"
import Header from "../Header.js"

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { boxSizing } from "@material-ui/system";

const useStyles = makeStyles((theme) => ({
    midpanel:{
        width: "100%",
        float: "left",
        height: "100%",
        marginTop: "100px",
        marginLeft: "50px",
        paddingTop: "20px",
        textAlign: "center",
        backgroundColor: "rgba(255,255,255, 0)"
    }
    
  }));

function MainPage() {

    const classes = useStyles();

    const [menu, setMenu] = useState(false);

    const handleMenu = () => {
        setMenu(!menu)
        console.log(menu)
    }

    return (
     
    // This Flexbox is for header and Mainpage (top down)
    <Box
        display="flex"
        flexWrap="wrap"
        bgcolor="transparent"
        flexDirection="column"   
    >
        <Box order="1">
            <Header handleMenu={handleMenu} />
        </Box>
        
        <Box // This Flexbox is for leftPanel (SideNavBar) and MidPanel (TodoList and Decription Panel) Left to Right
            display="flex"
            flexWrap="nowrap"
            justifyContent="space-around"            
            bgcolor="transparent"
            order="2"
            >
             <Box>
            <LeftPanel menuState={menu} handleMenu={handleMenu} />
            </Box>
                <Box className={classes.midpanel } order="2">
                    <MidPanel />
                </Box>
        </Box>
    </Box>
    )
}

export default MainPage