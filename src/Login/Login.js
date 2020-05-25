import React from "react"

class Login extends React.Component {
    constructor(props){
      super(props);
      this.state={
        username:'',
        password:''
      }
     }


    render() {
        return (
              <div>
                 <h2>Login</h2>
                 <div className="header"> Username</div>
                 <input type="text" name="username"  />
                 
                 <div className="header"> Password</div>
                 <input type="text" name="password" />
      </div>
    );
  }
}

export default Login;