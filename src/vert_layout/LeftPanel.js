/* This is the original code for Expansion Drawer*/

import { sizing } from '@material-ui/system';
import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const drawerWidth = 230

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
 
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
    
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  }));


function LeftPanel() {

    const classes = useStyles();
    const theme = useTheme();

    return (
        <div className={classes.root}>
        <CssBaseline />
        <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {['All','Today', 'Month', 'Year'].map((text, index) => (
              <ListItem button key={text} onClick={() => console.log({text})}> 
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Work', 'School', 'Health', 'Personal','Others'].map((text, index) => (
               <ListItem button key={text} onClick={() => console.log({text})}> 
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
         
          <ListItem button key="Completed Tasks" onClick={() => console.log("Hello")}>
                <ListItemIcon><MailIcon /></ListItemIcon>
                <ListItemText primary="Completed Tasks" />
              </ListItem>
        </div>
      </Drawer>
        </div>
     );
    }



export default LeftPanel