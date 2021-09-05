import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'

axios.defaults.baseURL = "http://127.0.0.1:8000";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const stripeConfig = loadStripe('pk_test_51JPIxKSCWQ7TprZSX26u3pd250KuHAg4DDnVFSwuRCa3m3IdP8ca4zk6DNHbilRryJUWqJHGTO2vGYZkdPDkkJyj00ZgT0dsro')

ReactDOM.render(
  <React.StrictMode>
    <Elements stripe={stripeConfig}>
      <App />
    </Elements>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
