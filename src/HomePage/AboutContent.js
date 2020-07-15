import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'
import GitHubIcon from '@material-ui/icons/GitHub';


const useStyles = makeStyles((theme) => ({
    content: {
        color: "black",
        paddingLeft:"25px",
        paddingTop:"25px",
        minHeight:"100%",
        fontSize:"20px",
    },
 
}));

function AboutContent() {

const classes = useStyles();

    return (
            <Box 
                border="solid rgb(255,255,255)"
                bgcolor= "rgb(255,255,255, 0.95)"
                width="95%"   // Change this to adjust the width of the about page
                borderRadius={8}
                textAlign="left"
                overflow="auto"
                >
            <div className= {classes.content}>
            <h3> About our app </h3>
            <br/>
            <p>Ezcalate is a To-do-List Application with Time Tracking Capabilities
               and Data Visualisation Tools in order to help enhance your productivity!
            </p>
            <p>Unlike other web applications, our application combines the two main features of 
               any productivity app (timer and to-do-list) into one, while adding additional features 
               such as a our to-do-list being able to be filtered, customized and sorted. Our web 
               application also utilizes an account with a login security system to ensure 
               that all data is personalized and uploaded into the cloud, so it will never be lost. 
            </p>
            <br/>

            <h3> Our Features </h3>
            <br/>
               <h4>1)   To Do List </h4>
               <p>Allows the user to keep a log of the tasks they need to accomplish by any arbitrary 
                  deadline. The tasks can be sorted and filtered by importance, relevance or even customized 
                  to be grouped to the user's preferences. This to-do-list can even be synced to one's 
                  calendar across multiple devices, allowing them to view and plan their schedule with ease.
               </p>
               <br/>

               <h4>2)   Timer Feature </h4>
               <p>Allows the user to track the amount of time spent doing a certain activity, and keeps 
                  a record of it so they can track the their productivity levels on any particular day. 
                  This data can be represented as different charts or graphs, depending on the user's 
                  liking, so as to better evaluate how they should spend their day.
               </p>
               <br/>

               <h4>3)   Data Visualisation </h4>
               <p>Unlike many other productivity apps, our web application's signature feature is the Data 
                  Visualisation Tool. This tool allows the user to view his productivity in any manner that he 
                  sees fit, be it in the form of a chart, graph, histogram etc. , all with an amazing 
                  user-friendly and sleek Interface. This tool also gives an overview and in-depth analysis of 
                  the time spent on certain activities, and even gives suggestions on how one can improve on his 
                  time management.
               </p>
               <br/>

            <h3> Credits </h3>
            <p>
               Made by CS undergraduates Kieron Koh and Rishabh Paliwal from Team Ezcalate for Orbital 2020
            </p>

            
            <p>
               <GitHubIcon/> Check out our Github <a href="https://github.com/the-reefshark/Ezcalate">here</a>!
            </p>

            </div>
            </Box>
    )
}

export default AboutContent;