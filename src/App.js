import React, { useState } from 'react'
import { ToastProvider } from 'react-toast-notifications';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Signup from 'pages/SignupPage/Signup.js';
import Login from 'pages/LoginPage/Login.js';
import Home from 'pages/HomePage/Home.js';
import SellerDashboard from 'pages/Seller Dashboard/SellerDashboard';
import AddMedicine from 'pages/Seller Dashboard/SellerAddMedicine';

import Store from 'pages/Store Page/Store';
import Cart from 'pages/Cart Page/Cart';
import Payment from 'pages/Payment Page/Payment';
import PaymentSuccess from 'pages/Payment Page/PaymentSuccess';
import MedicinesContext from 'contexts/Medicine';


function App() {

  const [medicines, setMedicines] = useState([]);
  const value = { medicines, setMedicines }
  return (
    <div>
      <ToastProvider autoDismiss={true}>
        <Router>
          <Switch>
            <MedicinesContext.Provider value={value}>
              <Route exact path="/" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/product" component={Home} />
              <Route exact path="/login" component={Login} />

              {/* Route For Store Page */}
              <Route exact path="/store" component={Store} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/payment" component={Payment} />
              <Route exact path="/paymentsuccess" component={PaymentSuccess} />

              {/* Seller Dashboard */}
              <Route exact path="/seller" component={SellerDashboard}/>
              <Route exact path="/addmedicine" component={AddMedicine}/>
              <Redirect exact to="/" />
            </MedicinesContext.Provider>
          </Switch>
        </Router>
      </ToastProvider>
    </div>
  )
}

export default App
