import React from 'react';

import Header from "./Header"
import TodoList from "./TodoList"
import Footer from "./Footer"

class App extends React.Component { 
  render() {
    return (
        <div>
            <Header />
            <TodoList />
            <Footer />
        </div>
    )
  }
}

export default App;