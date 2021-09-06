import React from "react";
import { useFormik } from 'formik';
import { Link, Redirect, NavLink } from "react-router-dom";
import * as yup from 'yup';
import axios from "axios";
import { ToastProvider, useToasts } from 'react-toast-notifications';
import { useHistory } from "react-router-dom";

function Login() {
  const { addToast } = useToasts();
  const history = useHistory();


  const schema = yup.object().shape({
    user_email: yup.string().required().email(),
    password: yup.string().required().min(6, "password should be greater than 6"),
  })

  const formik = useFormik({
    initialValues: {
      user_email: '',
      password: ''
    },
    onSubmit: (data) => {
      console.log(data)
      axios.post('/user/login/', data).then(
        (res) => {
          console.log("response", res);
          addToast('Loged in Successfully', { appearance: 'success' });
          localStorage.setItem('user_id', res.data.user_id)
          if (res.data.role === 'Seller') {
            localStorage.setItem('store_id', res.data.store_id)
            history.push('/seller')
          } else {
            history.push('/product')
          }
        }
      ).catch((err) => {
        if (err.response) {
          console.log(err.response.data.detail)
          addToast(err.response.data.detail, { appearance: 'error' });
        }
        else {
          console.log("server is down")
          addToast("Server is down", { appearance: 'error' });
        }

      })

    },
    validationSchema: schema,
  });


  return (
    <div>
      <nav className="navbar shadow navbar-expand-lg navbar-dark bg-dark navbar-expand-lg p-4">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <NavLink className="navbar-brand " to exact="/">
            <svg
              width="2em"
              height="2em"
              viewBox="0 0 16 16"
              className="bi bi-bag-fill inline-block align-bottom mr-2"
              fill="orange"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 1a2.5 2.5 0 0 0-2.5 2.5V4h5v-.5A2.5 2.5 0 0 0 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"
              />
            </svg>
            Online Medical Store
          </NavLink>

          <ul className="navbar-nav mr-auto">
            <li className="nav-item active ">
              <NavLink className="nav-link  mt-3" exact to="/product">
                Store <span className="sr-only ">(current)</span>
              </NavLink>
            </li>
          </ul>

          <button className="btn  btn-secondary ml-5 font-weight-bold">
            <NavLink className="text-white nav-link p-0" exact to="/signup">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-plus m-1"
                fill="orange"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                />
              </svg>
              Create Account
            </NavLink>
          </button>
        </div>
      </nav>
      <div className="container ">
        <div className="row justify-content-center align-items-center mt-3 ">
          <div className="col-10 col-md-8 col-lg-4 bg-light pb-5 pt-5 pl-3 pr-3 mt-5">
            <div className="panel panel-primary mt-1">
              <div className="panel-heading">
                <h4 className=" text-center mb-5 ">
                  <svg
                    width="2em"
                    height="2em"
                    viewBox="0 0 16 16"
                    className="bi bi-bag-fill inline-block align-bottom mr-2"
                    fill="orange"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 1a2.5 2.5 0 0 0-2.5 2.5V4h5v-.5A2.5 2.5 0 0 0 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"
                    />
                  </svg>
                  <span>Online Medicine Store </span>
                </h4>
                <h3 className="">Login </h3>
              </div>
              <div className="panel-body">
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="text"
                      className="form-control"

                      placeholder="Email*"
                      name="user_email"
                      value={formik.values.user_email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password*"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      minLength="6"
                      required
                    />
                  </div>
                  <p></p>

                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
