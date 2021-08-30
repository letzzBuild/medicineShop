import React from 'react'
import {useFormik} from 'formik';
import { Link, Redirect, NavLink } from "react-router-dom";
import * as yup from 'yup';
function Signup() {

    const schema = yup.object().shape({
        user_email: yup.string().required().email(),
        user_name : yup.string().required(),
        password: yup.string().required().min(6,"password should be greater than 6"),
    })

     const formik = useFormik({
         initialValues: {
             user_email: '',
             user_name : '',
             password : ''
         },
         onSubmit: (data)=> {
             console.log(data)

         },
         validationSchema : schema,
     });

    return (
        
        <div>
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
              class="bi bi-bag-fill inline-block align-bottom mr-2"
              fill="orange"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 1a2.5 2.5 0 0 0-2.5 2.5V4h5v-.5A2.5 2.5 0 0 0 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"
              />
            </svg>
            Online Medicine Shop 
          </NavLink>

          <ul className="navbar-nav mr-auto">
            <li className="nav-item active ">
              <NavLink className="nav-link  mt-3" exact to="/store">
                Store <span className="sr-only ">(current)</span>
              </NavLink>
            </li>
          </ul>
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
                    class="bi bi-bag-fill inline-block align-bottom mr-2"
                    fill="orange"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 1a2.5 2.5 0 0 0-2.5 2.5V4h5v-.5A2.5 2.5 0 0 0 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"
                    />
                  </svg>
                  <span>Online Medicine Shop </span>
                </h4>
                <h1>Sign Up</h1>
                <p>Create your Account</p>
              </div>
              <div className="panel-body">
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Name*"
                      name="user_name"
                      value={formik.values.user_name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    <h6 style={{color:'red'}}>{(formik.errors.user_name && formik.touched.user_name) && formik.errors.user_name}</h6>
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Email*"
                      name="user_email"
                      value={formik.values.user_email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    <h6 style={{color:'red'}}>{(formik.errors.user_email && formik.touched.user_email) && formik.errors.user_email}</h6>
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Password*"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      minLength="6"
                      required
                    />
                    <h6 style={{color:'red'}}>{(formik.errors.password && formik.touched.password) && formik.errors.password}</h6>
                  </div>
                
                  <button className="btn btn-success" type="submit">
                    Register
                  </button>
                </form>
                <p className="mt-3">
                  Already have an account? <Link to="/login">Sign In</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        </div>
    )
}

export default Signup
