import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './css.css';
import { useNavigate } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import HOC from "./HOC";

const Income = () => {

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

  const received = displayList.reduce((total, worker) => total + parseInt(worker.paid), 0);

  const totalAmount = displayList.reduce((total, worker) => total + parseInt(worker.amount), 0);

  const pending = displayList.reduce((total, worker) => total + parseInt(worker.due), 0);

  

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
      axios.post('http://localhost:3001/search-by-name/',{inputText})
      .then(res => {
        console.log(res.data.workers)
        setDisplayList(res.data.workers);
      })
      .catch(error => {
        alert("Not Found")
        console.error(error);
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
        alert("Not Found")
        console.error("Error fetching workers by Area:", error);
      });
    }else{
      alert('Area Required')
    }
  }

  return (
    <div className="container mt-5">
      <div className="text-center">
        <button className="btn btn-success mb-4 me-4" onClick={onClickBtn}>Add Income</button>
      </div>

      <div className="d-flex justify-content-around">
        <h6 className="display-6 text-center my-4 text-primary">
          Received: {received} Rs
        </h6>{/*display is for text size and it ranges from 1 to 6*/}

        <h6 className="display-6 text-center my-4 text-primary">
          Pending: {pending} Rs
        </h6>

        <h3 className="display-6 text-center my-4 text-primary">
          Total: {totalAmount} Rs
        </h3>
      </div>

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
          <table className="table table-striped text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Area</th>
              <th>Date</th>
              <th>Received</th>
              <th>Pending</th>
              <th>Amount</th>
              
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayList.sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date, newest first
            .map((worker) => (
              <tr key={worker.id}>
                <td>{worker.name}</td>
                <td>{worker.area}</td>
                <td>{worker.date}</td>
                <td>{worker.paid}</td>
                <td>{worker.due}</td>
                <td>{worker.amount}</td>
      
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

export default HOC(Income);
