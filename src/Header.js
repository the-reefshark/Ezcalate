import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import Logo from "./Background Images/Ezcalate_logo.png"
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/Menuitem'
import Fade from '@material-ui/core/Fade'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }, 
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: 'Stylish',
    fontSize: "40px",
    color: "white",
    textTransform: "none"
  },
  Appbar:{
    background: "black",
    position: "fixed",
    paddingBottom: "15px",
    // 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
    zIndex: theme.zIndex.drawer + 1 // trying to make header [pop out]
  },
  navlinks: {
    display: 'flex',
    flexDirection: 'row',
    padding: '0',
  },
  button_unlock:{
    color: "white",
    textTransform: "none",
    // fontFamily: 'Ubuntu',
    fontSize: "20px"

  },
  button_lock:{    
    color: "dimgrey",
    textTransform: "none",
    // fontFamily: "Ubuntu",
    fontSize: "20px",

},
  
}));

export default function MenuAppBar(props) {
  const classes = useStyles();

  const [Loggedin, setLoggedin] = useState(() => {return props.user});

  useEffect(() => {
    setLoggedin(props.user)}, [setLoggedin, props.user]);


  // For the profile Icon Menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (

      <AppBar position="static" className= {classes.Appbar}>
        <Toolbar>
        <Box
          width="100%"
          flexDirection="row"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        > 
        
        {/* For the main Logo */}
        <Box >
          <Link to="/"> 
              <Box alignItems="center" display="flex" >
                  <Box display="inline"> <Avatar src={Logo}/> </Box>
                  <Box display="inline" paddingLeft="15px" > 
                    <Typography variant="h6" className={classes.title}>
                      Ezcalate
                    </Typography>
                  </Box>
              </Box>
            </Link>
        </Box>
        {/* For the Navigational Links */}
            <Box 
              display="flex"
              flexGrow="6" 
              paddingTop="15px"
              alignItems="flex-end"
              justifyContent="space-around">
                <Link to="/about">
                  <Box>
                    <Typography className={classes.button_unlock}>About Us</Typography>
                  </Box>
                </Link>

                <Box>
                  {Loggedin 
                  ? <Link to="/todolist">
                      <Typography className={classes.button_unlock}>To Do List</Typography>
                    </Link>

                  : <Typography className={classes.button_lock}>To Do List</Typography>
                  }
                </Box>

                <Box>
                  {Loggedin 
                  ? <Link to="/visualiser">
                      <Typography className={classes.button_unlock}>Data Visualisation</Typography>
                    </Link>

                  : <Typography className={classes.button_lock}>Data Visualisation</Typography>
                  }
                </Box>
              
            </Box>

        {/* For the Login/Register */}

            <Box  
              flexBasis="20%"
              display="flex" 
              justifyContent="flex-end"
              alignItems="center">

              {!Loggedin
                ?
                <Button onClick={props.loginWithRedirect}>
                    <Typography className={classes.button_unlock}>Login / Register</Typography>
                </Button>
                :
                <>
                {/* Console.log(Loggedin) to see the various user infos, there is email etc. */}
                 <Box>
                      <Typography className={classes.button_unlock}>Welcome Back, {Loggedin["nickname"]}! </Typography>
                  </Box> 
                  <Box>
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      color="inherit"
                      onClick={handleClick}
                    >
                      <AccountCircle />
                    </IconButton>
                    <Menu
                        id="fade-menu"
                        anchorEl={anchorEl}
                        getContentAnchorEl={null}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        transformOrigin={{ vertical: "top", horizontal: "center" }}
                        PaperProps={{
                          style: {
                            marginTop: "5px",
                            backgroundColor: "black",
                            color:"white",
                          }
                        }}
                      >
                        <MenuItem onClick={props.logout}>Logout</MenuItem>
                      </Menu>
                  </Box>
                 
                  </>
                  }
              </Box>
          </Box> 
        </Toolbar>
      </AppBar>
  );
}