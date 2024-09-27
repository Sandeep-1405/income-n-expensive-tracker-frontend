import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './css.css';
import { useNavigate } from "react-router";
import auth from "../firebase/firebase";
import axios from "axios";
import { Link } from "react-router-dom";
import HOC from "./HOC";

const Home = () => {
  const navigate = useNavigate();
  const owner = localStorage.getItem('displayName') || "Unknown User";
  const [displayList, setDisplayList] = useState([]);
  const [inputText,setInputText] = useState('')

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

  const totalAmount = displayList.reduce((total, worker) => total + parseInt(worker.amount), 0);

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

  const handleDelete = async(id) =>{
    try{
        await axios.delete('http://localhost:3001/workers/'+id)
        .then(() => {
          console.log("worker deleted");
          window.location.reload()
        })
        .catch((error) => {
          console.error(error);
        });
        
    }catch(err){
        console.log(err)
    }
  }

  const onClickBtn = () => {
    navigate('/add');
  };

  const onClickSearchByName = () =>{
    if (inputText !== ""){
      axios.get('http://localhost:3001/search-by-name/'+inputText)
      .then(res => {
        setDisplayList(res.data.workers);
      })
      .catch(error => {
        alert("Error fetching workers by Name")
        console.error("Error fetching workers by Name");
      });
    }else{
      alert('Name Required')
    }
  }

  const onClickSearchByArea = () =>{
    if (inputText !== ""){
      axios.get('http://localhost:3001/search-by-area/'+inputText)
      .then(res => {
        setDisplayList(res.data.workers);
      })
      .catch(error => {
        alert("Error fetching workers by Area")
        console.error("Error fetching workers by Area:", error);
      });
    }else{
      alert('Area Required')
    }
  }

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="mb-4">Welcome {owner}</h1>
        <button className="btn btn-success mb-4" onClick={onClickBtn}>Add New</button>
        <button className="btn btn-primary mb-4" onClick={onClickLogout}>Logout</button>
      </div>
      <h3 className="display-4 text-center my-4 text-primary">
        Total: {totalAmount} Rs
      </h3>

      <div className="input-group mb-3">
        <input 
          type="search" 
          className="form-control" 
          placeholder="Search By Name/Area..." 
          aria-label="Search"
          value={inputText}
          onChange={(e)=>setInputText(e.target.value)}
        />
        <div className="input-group-append">
          <button className="btn btn-outline-primary" type="button" onClick={onClickSearchByName}>
            Search by Name
          </button>
          <button className="btn btn-outline-secondary" type="button" onClick={onClickSearchByArea}>
            Search by Area
          </button>
        </div>
      </div>


      <div className="row">
        {displayList.length === 0 ? (
          <div className="col-12">
            <h4 className="text-center text-muted">Workers Details Not Found</h4>
          </div>
        ) : (
          <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Area</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayList.map((worker) => (
              <tr key={worker.id}>
                <td>{worker.name}</td>
                <td>{worker.area}</td>
                <td>{worker.date}</td>
                <td>{worker.amount}</td>
                <td>{worker.description ? worker.description : 'N/A'}</td>
                <td>
                  <Link to={`/edit/${worker.id}`} className="btn btn-warning btn-sm m-1">Edit</Link>
                  <button className="btn btn-danger btn-sm m-1" onClick={() => handleDelete(worker.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        )}
      </div>
    </div>
  );
};

export default HOC(Home);
