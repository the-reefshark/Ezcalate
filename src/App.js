

import ToDoList from "./ToDoList/TodoList"
import Footer from "./Footer"
import "./App.css"
import React from 'react';
import Header from './components/Header';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import { useAuth0 } from './context/auth0-context';
import TodoFormForm from "./ToDoList/TodoFormForm"


function App() {
  const { isLoading, user, loginWithRedirect, logout } = useAuth0();

  return (
    <>
    
    /* <Header/>
      <div className="hero is-info is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            {!isLoading && !user && (
              <>
                <h1>Click Below!</h1>
                <button onClick={loginWithRedirect} className="login">
                  Login
              </button>
              </>
            )}
            {!isLoading && user && (
              <>
                <h1>You are logged in!</h1>
                <p>Hello {user.name}</p>

                {user.picture && <img src={user.picture} alt="My Avatar" />}
                <hr />

                <ToDoList/> 


                <button
                  onClick={() => logout({ returnTo: window.location.origin })}
                  className="button is-small is-dark"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    
    
   
    </>
  
  )
}


export default App;