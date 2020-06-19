

// import ToDoList from "./ToDoList/TodoList"
import "./App.css"
import React from 'react';
// import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
// import { useAuth0 } from './context/auth0-context';
// import TodoFormForm from "./ToDoList/TodoFormForm"

//Imports for vert layout
import Header from "./Header"
import MainPage from "./vert_layout/MainPage"
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
  
  main: {
    // backgroundImage: Image,
    // height: "100%",
    // backgroundposition: "center",
    // backgroundrepeat: "no-repeat",
    // backgroundsize: "cover"
  }

}));

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

                // <ToDoList/> 


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

  
  const classes = useStyles();


  return (
    <body >
        
      <div className={classes.main}>
          <MainPage/>
      </div>
      
    </body>
  )
}

export default App;