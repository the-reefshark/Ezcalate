

// import ToDoList from "./ToDoList/TodoList"
// import "./App.css"
import React from 'react';
// import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
// import { useAuth0 } from './context/auth0-context';
// import TodoFormForm from "./ToDoList/TodoFormForm"

//Imports for vert layout
import Header from "./Header"
import MainPage from "./vert_layout/MainPage"

function App() {
  //const { isLoading, user, loginWithRedirect, logout } = useAuth0();

  // return (
  //   <>
  //   {/* /* <Header/>
  //     <div className="hero is-info is-fullheight">
  //       <div className="hero-body">
  //         <div className="container has-text-centered">
  //           {!isLoading && !user && (
  //             <>
  //               <h1>Click Below!</h1>
  //               <button onClick={loginWithRedirect} className="login">
  //                 Login
  //             </button>
  //             </>
  //           )}
  //           {!isLoading && user && (
  //             <>
  //               <h1>You are logged in!</h1>
  //               <p>Hello {user.name}</p>

  //               {user.picture && <img src={user.picture} alt="My Avatar" />}
  //               <hr />

               


  //               <button
  //                 onClick={() => logout({ returnTo: window.location.origin })}
  //                 className="button is-small is-dark"
  //               >
  //                 Logout
  //               </button>
  //             </>
  //           )}
  //         </div>
  //       </div>
  //     </div> */}
    
    
  //   <ToDoList/> 
  //   </>
  // )

  // Vertical Panels version:
  return (
    <div>
      <Header />
      <MainPage />
    </div>
  )
}

export default App;