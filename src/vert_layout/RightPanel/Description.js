import React, {useRef, useState, useEffect} from "react"
import Editable from "./Editable";


function Description(props) {

    const [item, SetItem] = useState(()=> {return props.currentDescription}) // State of todoitem object (It's abit extra but makes life easier)

    const [task, setTask] = useState(()=> {
      console.log(item)
        return item["0"]["task_name"]  
    })

    const [detail, setDetail] = useState(()=> {
      return item["0"]["details"]
    })

    useEffect(()=> { // This updates the Description Panel when swtiching tasks
      if (props.currentDescription !== item) {
        SetItem(props.currentDescription)
        setTask(props.currentDescription["0"]["task_name"])
        setDetail(props.currentDescription["0"]["details"])
      }
    }) 


    const inputRef = useRef();

    return (
        <>
        <header>
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
             </header>

        <body>

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
        </body>
        
        
      </>
    )
}

export default Description;