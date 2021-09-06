import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import shop from 'assets/shoping.png';
import './homepage.css'
import NavBar from 'components/Navbar/Navbar.js'
import axios from 'axios';
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();
  let cancelToken;
  const [products, setproducts] = useState([])

  const searchMedicines = (event) => {

    let data = {
      "medicine_name": event.target.value
    }
    //Check if there are any previous pending requests
    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel("Operation canceled due to new request.")
    }

    //Save the cancel token for the current request
    cancelToken = axios.CancelToken.source()

    axios.post("/medicine/search/medicine/", data, { cancelToken: cancelToken.token }).then((res) => {
      console.log(res.data);
      setproducts(res.data)
    }).catch(() => { })
  }


  const getproducts = () => {
    console.log("getting products");
    let list = [];
    let result = [];
    products.map((product) => {
      return list.push(
        <div className="card mb-4 shadow-sm">
          <div className="limit">
            <img
              style={{
                display: "block",
                margin: "0 auto 10px",
                maxHeight: "200px",
                maxWidth: "100",
              }}
              className="img-fluid"
              src={axios.defaults.baseURL + product.medicine_image}
              alt="Card image cap"
            />
          </div>
          <span class="card-notify-year">10%</span>
          <div className="card-body">
            <strong className="d-inline-block mb-2 text-secondary">
              {product.medicine_name}
            </strong>
            <h5 className="card-title">Store Name :{product.store_name}</h5>
            <h5 className="card-title">
              <span className="text-muted ">Store Phone :</span>
              {product.store_phone}
            </h5>
            <h5 className="card-title">
              <span className="text-muted ">Store Address :</span>
              {product.store_address}
            </h5>
            <h4 className="card-title">
              <span className="text-success">Price :</span>
              {product.price}
              <span className="card-text"> Rs.</span>
            </h4>
            <hr className="my-4" />

            <button
              onClick={() => {
                history.push({
                  pathname: '/store',
                  state: product.store_id
              })
              }
              }
              className="btn btn-outline-success float-right mb-2"
            >
              View In Store
            </button>



          </div>
        </div>
      );
    });

    for (let i = 0; i < list.length; i += 3) {
      result.push(
        <div className="container">
          <div key={i} className="row">
            <div className="col-md-4">{list[i] ? list[i] : null}</div>
            <div className="col-md-4">{list[i + 1] ? list[i + 1] : null}</div>
            <div className="col-md-4">{list[i + 2] ? list[i + 2] : null}</div>
          </div>
        </div>
      );
    }

    return result;
  };


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
              class="bi bi-bag-fill inline-block align-bottom mr-2"
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
          <input onChange={searchMedicines} type="text" class="form-control" placeholder="Search Medicine Name" aria-label="Username" aria-describedby="basic-addon1"></input>


        </div>
      </nav>
      <div className="homepage">
        <div className="banner">
          <div className="description">
            <h1 className="display-4 cha">Online Medicine Store</h1>
            <p className="mt-3 text-secondary">
              We provides Quality Products to Our Customers.
              <br />
              great prices with great discounts
            </p>
            <Link
              exact
              to="/product"
              className="btn btn-outline-secondary btn-lg mt-3 text-white"
            >
              Buy Now
            </Link>
          </div>
          <div className="img-section">
            <img
              style={{
                display: "block",
                margin: "0 auto 10px",
                maxHeight: "400px",
                maxWidth: "400",
              }}
              className="img-fluid"
              src={shop}
              alt="Card image cap"
            />
          </div>
        </div>
        <div className="wave">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill=" #424949 "
              fillOpacity="1"
              d="M0,256L48,229.3C96,203,192,149,288,154.7C384,160,480,224,576,218.7C672,213,768,139,864,128C960,117,1056,171,1152,197.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
      <br></br>
      <div style={{ margin: 10 }}><h2>Products Results</h2></div>
      {getproducts()}
    </div>
  );
}

export default Home;
