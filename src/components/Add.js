import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import HOC from "./HOC";
import axios from "axios";
import { useNavigate } from "react-router";

const Add = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [area, setArea] = useState("");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const owner = localStorage.getItem('displayName') || "Unknown User";
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/workers',{name,date,area,amount,description,owner})
    .then(res=>{
      console.log(res)
      navigate('/')
    })
    .catch(error=>{
      console.log(error)
    })
    
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Add New</h1>
      <div className="card p-4 shadow w-100 mx-auto" style={{ maxWidth: "600px" }}>
        <h2 className="text-center mb-4">Enter Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="area" className="form-label">Area</label>
            <input
              type="text"
              className="form-control"
              id="area"
              placeholder="Enter Area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">Amount</label>
            <input
              type="number"
              className="form-control"
              id="amount"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="form-label">Description (Optional)</label>
            <textarea
              className="form-control"
              id="description"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default HOC(Add);
