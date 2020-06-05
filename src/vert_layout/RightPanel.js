import React, {useRef, useState} from "react"
import Editable from "./Editable";


function RightPanel() {

    const [task, setTask] = useState("");
    const inputRef = useRef();

    return (
        <>
        <header>
        <Editable
        text={task}
        placeholder="Click a Task from title To Do List!"
        childRef={inputRef}
        type="input"
      >
        <input
          ref={inputRef}
          type="text"
          name="task"
          placeholder="Write a task name"
          value={task}
          onChange={e => setTask(e.target.value)}
        />
      </Editable>
             </header>

        <body>

        <Editable
        text={task}
        placeholder="Details"
        childRef={inputRef}
        type="input"
      >
        <input
          ref={inputRef}
          type="text"
          name="task"
          placeholder="Write a task name"
          value={task}
          onChange={e => setTask(e.target.value)}
        />
      </Editable>
        </body>
        
        
      </>
    )
}

export default RightPanel