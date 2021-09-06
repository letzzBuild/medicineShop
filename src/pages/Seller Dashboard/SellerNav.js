import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';


const Navbar = ({ isAuthenticated }) => {

    const authLinks = (
        <li className="nav-item">
            <a className='nav-link' href='#!'>Logout</a>

        </li>

    );

    const guestLinks = (
        <Fragment>
            <li className="nav-item">
                <NavLink className="nav-link" exact to='/addmedicine'>Add Medicine</NavLink>
            </li>
        </Fragment>
    );

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand">Online Medical Store</Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav" style={{ display: 'flex', alignItems: 'end' }}>
                    <li className="nav-item">
                        <NavLink className="nav-link" exact to='/seller'>Home</NavLink>
                    </li>
                    {<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;


