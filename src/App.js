
import "./App.css"
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import { useAuth0 } from './context/auth0-context';

// Background Images (change as necessary)
import ToDoImage from "./Background Images/coffeeshop1.jpg"
import LoginImage from "./Background Images/CoffeeLogin2.jpg"


//Relevant Components to be rendered
import MainPage from "./vert_layout/MainPage"
import Header from "./Header"
import HomePage from "./HomePage/HomePage.js"



const useStyles = makeStyles((theme) => ({
  
  //Styles for the HomePage & ToDolist Page -> simply change the backgroundImage to change
  loginpage: {
    backgroundImage: `url(${LoginImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    width: '100vw',
    height: '100vh',
    paddingTop: "100px",
    display:"flex",
    flexFlow:"column",
    justifyContent:"space-between"
  },
  todolist_page: {
      backgroundImage: `url(${ToDoImage})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      backgroundSize: "cover",
      width: '100vw',
      height: '100vh'
  
  }, 
  
}));

function App() {
  const { isLoading, user, loginWithRedirect, logout } = useAuth0();

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
    <>
        <Header 
          user={user} 
          isLoading={isLoading}
          loginWithRedirect={loginWithRedirect}
          logout={() => logout({ returnTo: window.location.origin })}/>

        {/* Home Page */}
        <div className={classes.loginpage}>
          <HomePage/>
        </div>

        {/* <div className={classes.todolist_page}>
          <MainPage/>
        </div>  */}

    </>
      
  )
}

export default App;


    

      
  // <div>
      //   <Header/>
      //   <div className={classes.loginpage} >
      //      <LoginPage/>
      //   </div>
      // </div>
 
      // <div>
      //   <Header/>
      
      //  </div>