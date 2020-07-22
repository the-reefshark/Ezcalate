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
  
  return (
    <>
      <Router>
          <Header 
            user={user} 
            isLoading={isLoading}
            loginWithRedirect={loginWithRedirect}
            logout={() => logout({ returnTo: window.location.origin })}
          />

          <Switch>
            <Route path="/" exact render={(props) => <HomePage {...props} 
              loginWithRedirect={loginWithRedirect} /> } 
            />
            <Route path="/about" component={ AboutPage } />
            <Route path="/todolist" component={ MainPage } />
            <Route path="/visualiser" component={ MainVisualiser } />
          </Switch>
      </Router>
    </>
  )
}

export default App