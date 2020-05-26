import React from "react"
import { useHistory } from "react-router-dom"
import { Redirect } from 'react-router-dom'


class Login extends React.Component {
    constructor(props){
      super(props);
      this.state={
        username:'',
        password:'',
        redirect: false
      }
     
    this.handleSubmit = this.handleSubmit.bind(this);
    
    }

  handleSubmit = () => {
    // alert('A name was submitted: ' + this.state.value);
    
    console.log('Username:' + this.state.username)
    console.log('password:' + this.state.password)
    this.setState({redirect: true})
    
    
  }
   
  

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='src\ToDoList\ToDoListAll.js' />
    }
  }
    


    render() {
      
        return (
          <div>
          {this.renderRedirect()}
          <form>
          <div>
            <label>
              Username:
              <input type="text" 
                     value={this.state.value} 
                     onChange = { e => this.setState({username: e.target.value})}
                      />
            </label>
          </div>

          <div>
            <label >
              Password:
              <input type="text" 
                     value={this.state.value} 
                     onChange = { e => this.setState({password: e.target.value})} />
            </label>
          </div>
          <input type="button" value="Submit" onClick={this.handleSubmit}/>
        </form>
        </div>
      
        )
    }
}

export default Login;