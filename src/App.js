import React, { useState } from 'react'
import { ToastProvider } from 'react-toast-notifications';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from 'pages/SignupPage/Signup.js';
import Login from 'pages/LoginPage/Login.js';
import Home from 'pages/HomePage/Home.js';

import Store from 'pages/Store Page/Store';
import Cart from 'pages/Cart Page/Cart';
import MedicinesContext from 'contexts/Medicine';


function App() {

    const [orderMedicines, setOrderMedicines] = useState([]);

    return (
        <div>
            <ToastProvider>
            <Router>
                <Switch>
                    <MedicinesContext.Provider value={orderMedicines}>
                        <Route exact path="/" component={Home} />
                        {/* <Route exact path="/addaccount" component={Addaccount} /> */}
                        <Route exact path="/signup" component={Signup} />
                        {/* <Route exact path="/reset_password" component={ResetPassword} /> */}
                        {/* <Route
                exact
                path="/password/reset/confirm/:uid/:token"
                component={ResetPasswordConfirm}
              /> */}
                        {/* <Route exact path="/activate/:uid/:token" component={Activate} /> */}
                        <Route exact path="/login" component={Login} />

                        {/* Route For Store Page */}
                        <Route exact path="/store" component={()=>(<Store value={orderMedicines} setValue={setOrderMedicines} />)} />
                        <Route exact path="/cart" component={Cart} />
                    </MedicinesContext.Provider>
                </Switch>
            </Router>
            </ToastProvider>
        </div>
    )
}

export default App
