import React, {useRef, useState, useEffect} from "react"
import Editable from "./Editable";
import "./Description.css"
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import Timer from "./Timer"
import Box from '@material-ui/core/Box'
import ListItem from '@material-ui/core/ListItem';

import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white" ,
    opacity: "100%",
    width: "100%",
    height: "100%",
    textAlign: " left",
    fontFamily: 'Pontano Sans, sans-serif',
    fontSize: "16px"
  },
  
  header: {
    color: "#000000",
    opacity: "100%",
    height: '100%',
    paddingLeft:"5px",
    textAlign: "left",
   
    // fontFamily: 'Trocchi',
    fontSize: "2vw",
    // fontweight: "normal",
    // lineheight: "48px"
  },
  
  details: {
    color: "#000000",
    opacity: "100%",
    paddingLeft: "5px"
   
    // fontFamily: 'Trocchi',
    // fontSize: "30px",
    // fontweight: "normal",
    // lineheight: "48px"

  }

  
}));


function Description(props) {
  
  const classes = useStyles();

  const [item, SetItem] = useState(()=> {return props.currentDescription}) // State of todoitem object (It's abit extra but makes life easier)
  const [task, setTask] = useState(()=> {return item["0"]["task_name"]})
  const [group, setGroup] = useState(()=> {return item["0"]["activity_type"]})
  const [date, setDate] = useState(()=> item["0"]["duedate"])
  const [detail, setDetail] = useState(()=> item["0"]["details"])

  useEffect(()=> { // This updates the Description Panel when swtiching tasks
    if (props.currentDescription !== item) {
      SetItem(props.currentDescription)
      setTask(props.currentDescription["0"]["task_name"])
      setGroup(props.currentDescription["0"]["activity_type"])
      setDate(props.currentDescription["0"]["duedate"])
      setDetail(props.currentDescription["0"]["details"])
    }
  }, [props.currentDescription, item]) 

  const inputRef = useRef();

  return (
    <Slide direction="left" in={props.isClicked}  mountOnEnter unmountOnExit>
      <div className={classes.root}>
      <Box  
        display="flex"
        flexDirection="column" 
        height="100%"
        justifyContent="flex-start">

        <Box order="1" padding="5px" borderBottom="solid 1px grey">
          <div className={classes.header}>
              <Editable
                text={task}
                placeholder="Task Name"
                childRef={inputRef}
                type="input"
                update = {props.handleChange}
                id={item["0"]["id"]}
                currentTask={task}
                currentDate = {date}
                currentDetail={detail}
              >
              <input
                ref={inputRef}
                type=""
                name="task"
                placeholder="Write a task name"
                value={task}
                onChange={e => setTask(e.target.value)}
                border="transparent"
              />
              </Editable>
          </div>
        </Box>

        <Box order="2" display="flex" flexDirection="column"  flexGrow="4">
          <div className={classes.details}>
            <Box display="flex" flexDirection="row">
              <ListItem>
                  <ArrowRightIcon/>
                  <Box flexGrow="1" > Activity Type: </Box>
                  <Box flexGrow="10" justifyContent="left">{group}</Box>
              </ListItem>
            </Box>

            <Box display="flex" flexDirection="row">
              <ListItem>
              <ArrowRightIcon/>
              <Box flexGrow="1"> Due Date: </Box>
              <Box flexGrow="10">
                <Editable
                      text={date}
                      placeholder="Due Date"
                      childRef={inputRef}
                      type="input"
                      update = {props.handleChange}
                      id={item["0"]["id"]}
                      currentTask={task}
                      currentDate = {date}
                      currentDetail={detail}
                    >
                    <input
                      ref={inputRef}
                      type="date"
                      name="task"
                      placeholder="Write a task name"
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      border="transparent"
                    />
                  </Editable>  
                  </Box>
                </ListItem>
              </Box>

              <Box >
                <ListItem> Details: </ListItem>
                <ListItem>
                    <Editable
                      text={detail}
                      placeholder=""
                      type="textarea"
                      
                      update={props.handleChange}
                      id={item["0"]["id"]}
                      currentTask={task}
                      currentDate = {date}
                      currentDetail={detail}
                    >
                      <textarea
                        name="description"
                        placeholder=""
                        rows="3"
                        value={detail}
                        onChange={e => setDetail(e.target.value)}
                      />
                    </Editable>
                  </ListItem>
                </Box>
            </div>
                
        </Box>

       

        <Box order="3">
          <Timer CurrentTime={item["0"]["timer"]} handleTimer={props.handleTimer} currentID={item["0"]["id"]}/> 
       </Box>
    </Box>
    </div>
  </Slide>
)}

export default Description;