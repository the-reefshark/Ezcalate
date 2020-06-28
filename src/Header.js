import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

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
    fontSize: "40px"
  },
  Appbar:{
    background: "black",
    position: "fixed",
    paddingBottom: "15px",
    // 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
    zIndex: theme.zIndex.drawer + 1 // trying to make header [pop out]
    
  }
}));

export default function MenuAppBar(props) {
  const classes = useStyles();

  return (
      <AppBar position="static" className= {classes.Appbar}>
       
        <Toolbar >
          <Typography variant="h6" className={classes.title}>
            Ezcalate
          </Typography>
         
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                // onClick={props.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              {/* <Menu
                id="menu-appbar"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={props.handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu> */}
            </div>
          
        </Toolbar>
      </AppBar>

  );
}