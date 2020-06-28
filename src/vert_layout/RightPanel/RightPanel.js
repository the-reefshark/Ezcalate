import React, {useState} from "react"
import Tododetails from "./Description"

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