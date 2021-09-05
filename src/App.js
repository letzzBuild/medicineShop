import React from 'react'
import { ToastProvider} from 'react-toast-notifications';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from 'pages/SignupPage/Signup.js';
import Login from 'pages/LoginPage/Login.js';
import Home from 'pages/HomePage/Home.js';


function App() {
  return (
    <div>
      <ToastProvider autoDismiss={true}>
      <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/product" component={Home} />              
              <Route exact path="/login" component={Login} />
              
            </Switch>
          </Router>
      </ToastProvider>
    </div>
  )
}

export default App
