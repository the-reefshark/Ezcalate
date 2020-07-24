import "./App.css"
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { useAuth0 } from './context/auth0-context'

//Relevant Components to be rendered
import MainPage from "./vert_layout/MainPage"
import Header from "./Header"
import HomePage from "./HomePage/HomePage.js"
import AboutPage from "./HomePage/AboutPage"
import MainVisualiser from "./Visualiser/MainVisualiser"

function App() {
  const { isLoading, user, loginWithRedirect, logout } = useAuth0()
  
  if (isLoading) {
    return <div> Is Loading</div>
  }

  else {
    return (
      <>
        <Router>
            <Header 
              user={user}
              loginWithRedirect={loginWithRedirect}
              logout={() => logout({ returnTo: window.location.origin })}
            />

            <Switch>
              <Route path="/" exact render={(props) => <HomePage {...props} loginWithRedirect={loginWithRedirect} /> } />
              <Route path="/about" component={ AboutPage } />
              <Route path="/todolist" render={(props) => <MainPage {...props} user={user} /> } />
              <Route path="/visualiser" render={(props) => <MainVisualiser {...props} user={user} /> } />
            </Switch>
        </Router>
      </>
    )
  }
}

export default App