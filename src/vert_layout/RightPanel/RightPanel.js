import React, {useRef, useState} from "react"
import Editable from "./Editable";
import Tododetails from "./Description"
import Timer from "./Timer"

function RightPanel() {

    const [clicked, Setclicked] = useState(() => {
      return true;
    })


    const onClick = () => {
      Setclicked(PrevState => {return !PrevState} )
    }

    return (
        
        <div>
          <button onClick={onClick} >Set</button>
          {!clicked && (
            <>
            </>
          )
          }
          {clicked && (
            <>
            [<Tododetails/>,
            ]
           </>
          )}
          
        </div>
   
        
      
    )
}

export default RightPanel