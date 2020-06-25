import React, {useRef, useState, useEffect} from "react"
import Editable from "./Editable";
import "./Description.css"
import Slide from '@material-ui/core/Slide';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Timer from "./Timer"
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white" ,
    opacity: "100%",
    width: "100%",
  },
  
  header: {
    color: "#000000",
    opacity: "100%",
   
    fontFamily: 'Trocchi',
    fontSize: "45px",
    fontweight: "normal",
    lineheight: "48px"
  },
  
  details: {
    color: "#000000",
    opacity: "100%",

   
    fontFamily: 'Trocchi',
    fontSize: "30px",
    fontweight: "normal",
    lineheight: "48px"

  }

  
}));


function Description(props) {
  
  const classes = useStyles();

  const [item, SetItem] = useState(()=> {return props.currentDescription}) // State of todoitem object (It's abit extra but makes life easier)
  const [task, setTask] = useState(()=> {return item["0"]["task_name"]})
  const [detail, setDetail] = useState(()=> item["0"]["details"])

  useEffect(()=> { // This updates the Description Panel when swtiching tasks
    if (props.currentDescription !== item) {
      SetItem(props.currentDescription)
      setTask(props.currentDescription["0"]["task_name"])
      setDetail(props.currentDescription["0"]["details"])
    }
  }) 

  const inputRef = useRef();

  return (
    <Slide direction="left" in={props.isClicked} mountOnEnter unmountOnExit>
      <div className={classes.root}>
      <Box height="100%"  >
        <Box>
        <header className={classes.header}>
          <div className="Task">
            <Editable
              text={task}
              placeholder=""
              childRef={inputRef}
              type="input"
              update = {props.handleChange}
              id={item["0"]["id"]}
              currentTask={task}
              currentDetail={detail}
            >
            <input
              ref={inputRef}
              type=""
              name="task"
              placeholder="Write a task name"
              value={task}
              onChange={e => setTask(e.target.value)}
            />
            </Editable>
          </div>
        </header>
        </Box>

        <Divider/>
      
        <Box>
        <div className = {classes.details}>
        <Editable
          text={detail}
          placeholder=""
          type="textarea"
          update={props.handleChange}
          id={item["0"]["id"]}
          currentTask={task}
          currentDetail={detail}
        >
          <textarea
            name="description"
            placeholder=""
            rows="5"
            value={detail}
            onChange={e => setDetail(e.target.value)}
          />
        </Editable>
        </div>
        </Box>
        <Box >
          <Timer/> 
       </Box>
    </Box>
    </div>
  </Slide>
)}

export default Description;