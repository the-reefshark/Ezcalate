import React from 'react';

import Header from "./Header"
import TodoList from "./TodoList"
import Footer from "./Footer"
import Login from "./Login/Login"
import Overall from "./Login/Overall"

class App extends React.Component { 
  render() {
    return (
        <div>
            <Overall/>
        </div>
    )
  }
}

export default App;