import "./App.css"
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { useAuth0 } from './context/auth0-context'

//Relevant Components to be rendered
import LoadingScreen from './LoadingScreen'
import MainPage from "./vert_layout/MainPage"
import Header from "./Header"
import HomePage from "./HomePage/HomePage.js"
import AboutPage from "./HomePage/AboutPage"
import MainVisualiser from "./Visualiser/MainVisualiser"
import VisualiserWrapper from "./Visualiser/VisualiserWrapper"

function App() {
  const { isLoading, user, loginWithRedirect, logout } = useAuth0()
  
  if (isLoading) {
    return (
        <LoadingScreen />
      )
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
              <Route path="/visualiser" render={(props) => <VisualiserWrapper {...props} user={user} /> } />
            </Switch>
        </Router>
      </>
    )
  }
}

export default App