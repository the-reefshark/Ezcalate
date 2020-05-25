import React from "react"
import Login from "./Login"
import Tabs from "./Tabs" 



class Overall extends React.Component {
    
    render() {
        return (
            <div>
            <h1>Ezcalate</h1>
           <Tabs>
            <div label="Login">
              <Login/>
            </div>
            <div label= "Register">
              
            </div>
          </Tabs>
          </div>
        )
    }
}

export default Overall;