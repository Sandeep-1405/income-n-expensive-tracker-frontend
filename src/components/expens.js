import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css.css";
import { useNavigate } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import HOC from "./HOC";

const Expens = () => {
  const navigate = useNavigate();
  const [displayList, setDisplayList] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem("email") || "Not loggedIn";
  const owner = email.replace("@gmail.com", "");

  useEffect(() => {
    if (owner !== "Unknown User") {
      setLoading(true); // Start loading
      axios
        .get(`http://localhost:3001/expensives/${owner}`)
        .then((res) => {
          setDisplayList(res.data.Expensives);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching workers:", error);
          setLoading(false); 
        });
    }
  }, [owner]);

  const paid = displayList.reduce((total, worker) => total + parseInt(worker.paid), 0);
  const totalAmount = displayList.reduce((total, worker) => total + parseInt(worker.amount), 0);
  const due = displayList.reduce((total, worker) => total + parseInt(worker.due), 0);

  const handleDelete = async(id) =>{
    try{
        await axios.delete(`http://localhost:3001/${owner}/expensive/${id}`)
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
    navigate("/add");
  };

  const onChangeSearch = async (e) => {
    const input = e.target.value;
    setInputText(input); // Update state
  
    if (!input) {
      // If input is cleared, fetch all data
      try {
        const res = await axios.get(`http://localhost:3001/expensives/${owner}`);
        setDisplayList(res.data.Expensives); // Update list with all data
      } catch (error) {
        console.error('Error fetching all data:', error);
      }
      return;
    }
  
    // Otherwise, search by input
    try {
      const res = await axios.get(`http://localhost:3001/${owner}/search/${input}`);
      setDisplayList(res.data.Expensives); // Update list with search results
    } catch (error) {
      console.error('Error searching:', error);
    }
  };
  


  return (
    <div className="container mt-5">
      <div className="text-center">
        <button className="btn btn-success mb-4 me-4" onClick={onClickBtn}>
          Add Expensive
        </button>
      </div>

      <div className="d-flex justify-content-around">
        <h6 className="display-6 text-center my-4 text-primary">Paid: {paid} Rs</h6>
        <h6 className="display-6 text-center my-4 text-primary">Due: {due} Rs</h6>
        <h3 className="display-6 text-center my-4 text-primary">Total: {totalAmount} Rs</h3>
      </div>

      <div className="input-group mb-3">
        <input
          type="search"
          className="form-control"
          placeholder="Search By Name/Area..."
          aria-label="Search"
          value={inputText}
          onChange={(e) => onChangeSearch(e)}
        />
        {/* <div className="input-group-append">
          <button className="btn btn-outline-primary" type="button" onClick={onClickSearchByName}>
            Search by Name
          </button>
          <button className="btn btn-outline-secondary" type="button" onClick={onClickSearchByArea}>
            Search by Area
          </button>
        </div>*/}
      </div>

      {loading ? (
        <div className="text-center">
          <h4>Loading...</h4>
        </div>
      ) : displayList.length === 0 ? (
        <div className="text-center">
          <h4 className="text-muted">No Expensives Found</h4>
        </div>
      ) : (
        <div className="row">
          <table className="table table-striped text-center">
            <thead>
              <tr>
                <th>Name</th>
                <th>Area</th>
                <th>Date</th>
                <th>Paid</th>
                <th>Due</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayList
                .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date, newest first
                .map((worker) => (
                  <tr key={worker.id}>
                    <td>{worker.name}</td>
                    <td>{worker.area}</td>
                    <td>{worker.date}</td>
                    <td>{worker.paid}</td>
                    <td>{worker.due}</td>
                    <td>{worker.amount}</td>
                    <td>
                      <Link to={`/edit/${worker.id}`} className="btn btn-warning btn-sm m-1">
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger btn-sm m-1"
                        onClick={() => handleDelete(worker.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HOC(Expens);
