/* This is the original code for Expansion Drawer*/

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import TodayIcon from '@material-ui/icons/Today';
import EventNoteIcon from '@material-ui/icons/EventNote';
import DateRangeIcon from '@material-ui/icons/DateRange';
import WorkIcon from '@material-ui/icons/Work';
import SchoolIcon from '@material-ui/icons/School';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonIcon from '@material-ui/icons/Person';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const drawerWidth = 230 //width of the sideNavBar (change to function)

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
    backgroundColor: "dimgrey",
    color: "white"

  },
  drawerContainer: {
    overflow: 'auto',
    paddingTop: "20px"
    
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  iconcolor: {
    fill: "white",
  },
  dividercolor: {
    backgroundColor: "darkgrey"
  }
  }));

function LeftPanel(props) {

    const classes = useStyles();

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
          <List >
            {['All','Today', 'Month', 'Year'].map(text => (
              <ListItem button key={text} onClick={() => props.changeParams(text)}> 
      
                <ListItemIcon >{text === 'All' ? <CalendarTodayIcon className={classes.iconcolor}/> : 
                               text === 'Today' ? <TodayIcon className={classes.iconcolor}/> : 
                               text === 'Month' ? <EventNoteIcon className={classes.iconcolor}/> :
                             /*text === 'year'*/ <DateRangeIcon className={classes.iconcolor}/>
                              }
                </ListItemIcon>

                <ListItemText primary={text} /> 
              </ListItem>
            ))}
          </List>
          <Divider className={classes.dividercolor}/>
          <List>
            {['Work', 'School', 'Health', 'Personal','Others'].map(text => (
               <ListItem button key={text} onClick={() => props.changeParams(text)}> 

                <ListItemIcon>{text === 'Work' ? <WorkIcon className={classes.iconcolor}/> :
                               text === 'School' ? <SchoolIcon className={classes.iconcolor}/> :
                               text === 'Health' ? <FavoriteIcon className={classes.iconcolor}/> :
                               text === 'Personal' ? <PersonIcon className={classes.iconcolor}/> :
                             /*text === 'Others'*/ <InboxIcon className={classes.iconcolor}/> 
                              }
                </ListItemIcon>

                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider className={classes.dividercolor}/>
         
          <ListItem button key="Completed Tasks" onClick={() => props.changeParams('Completed')}>
                <ListItemIcon><CheckCircleIcon className={classes.iconcolor}/></ListItemIcon>
                <ListItemText primary="Completed Tasks" />
              </ListItem>
        </div>
      </Drawer>
        </div>
     );
    }

export default LeftPanel