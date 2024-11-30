import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './css.css';
import { useNavigate } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import HOC from "./HOC";
import Navbar from "./Navbar";

const Home = () => {
  const owner = localStorage.getItem('displayName') || "Unknown User";

  return (
    <>
    
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="mb-4">Welcome {owner}</h1>
      </div>

    </div>
    </>
  );
};

export default HOC(Home);
