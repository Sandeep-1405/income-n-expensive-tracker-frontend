import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import auth from "../firebase/firebase";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken'); 

  const onClickLogout = () => {
    auth.signOut()
      .then(() => {
        localStorage.clear();
        navigate('/login');
        console.log("User signed out successfully.");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">My App</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto "> {/* Center nav items */}
            <li className="nav-item mx-md-5">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item mx-md-5">
              <Link className="nav-link" to="/expens">Expensives</Link>
            </li>
            <li className="nav-item mx-md-5">
              <Link className="nav-link" to="/income">Income</Link>
            </li>
            <li className="nav-item mx-md-5">
              <Link className="nav-link" to="/notes">Notes</Link>
            </li>
            <li className="nav-item mx-md-5">
              <Link className="nav-link" to="/add-category">Add Category</Link>
            </li>
            <li className="nav-item ms-md-5">
             
              <button className="btn btn-outline-light w-100 mt-2 mt-md-0" onClick={onClickLogout}>
                {token ? "Logout" : "Login"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
