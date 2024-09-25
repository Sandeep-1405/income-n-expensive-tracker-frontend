import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './css.css'; // Custom CSS (create this file for additional styling)
import { useNavigate } from "react-router";
import auth from "../firebase/firebase";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const owner = auth.currentUser?.displayName || "Unknown User"; // Handle null or undefined user
  const [displayList, setDisplayList] = useState([]);

  useEffect(() => {
    if (owner !== "Unknown User") {
      axios.get(`http://localhost:3001/workers/${owner}`)
        .then(res => {
          setDisplayList(res.data.workers);
        })
        .catch(error => {
          console.error("Error fetching workers:", error);
        });
    }
  }, [owner]);

  const onClickLogout = () => {
    auth.signOut()
      .then(() => {
        navigate('/login'); 
        console.log("User signed out successfully.");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
    });
  };

  const handleDelete = async(id) =>{
    try{
        await axios.delete('http://localhost:8081/user/'+id)
        window.location.reload()
    }catch(err){
        console.log(err)
    }
  }

  const onClickBtn = () => {
    navigate('/add');
  };

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="mb-4">Welcome {owner}</h1>
        <button className="btn btn-success mb-4" onClick={onClickBtn}>Add New Worker</button>
        <button className="btn btn-primary mb-4" onClick={onClickLogout}>Logout</button>
      </div>

      <div>
          <input type="search" />
          <button>Search by Name</button>
          <button>Search by Area</button>
      </div>

      <div className="row">
        {displayList.length === 0 ? (
          <div className="col-12">
            <h4 className="text-center text-muted">Workers Details Not Found</h4>
          </div>
        ) : (
          displayList.map((worker) => (
            <div key={worker.id} className="col-md-4 mb-4">
              <div className="card worker-card">
                <div className="card-body">
                  <h5 className="card-title">{worker.name}</h5>
                  <p className="card-text">Area: {worker.area}</p>
                  <p className="card-text">Date: {worker.date}</p>
                  {worker.description && <p className="card-text">Description: {worker.description}</p>}
                  <p className="card-text">Amount: {worker.amount}</p>
                  <div className="d-flex justify-content-around">
                    <Link to={`/edit/${worker.id}`} className="btn btn-warning">Edit</Link>
                    <button className="btn btn-danger" onClick={e =>handleDelete(worker.id)}>Delete</button>
                  </div>
                  
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
