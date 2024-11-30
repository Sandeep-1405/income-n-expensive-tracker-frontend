import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import HOC from "./HOC";
import axios from "axios";
import { useNavigate } from "react-router";

const Add = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [area, setArea] = useState("");
  const [paid, setPaid] = useState(0);
  const [due, setDue] = useState(0);
  const [amount, setAmount] = useState(0);

  const navigate = useNavigate();
  const email = localStorage.getItem('email') || "Not loggedIn ";
  const docName = email.replace('@gmail.com',"")

  useEffect(()=>{
    setAmount(parseInt(paid) + parseInt(due))
  },[paid,due])

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/expensive',{name,date,area,paid,due,amount,docName})
    .then(res=>{
      //console.log(res)
      navigate('/expens')
    })
    .catch(error=>{
      console.log(error)
    })
    
  };

  return (
    <div className="container my-5">
  
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
            <label htmlFor="paid" className="form-label">Paid</label>
            <input
              type="number"
              className="form-control"
              id="paid"
              placeholder="Enter paid amount"
              value={paid}
              onChange={(e) => setPaid(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="due" className="form-label">Due</label>
            <input
              type="number"
              className="form-control"
              id="due"
              placeholder="Enter due amount"
              value={due}
              onChange={(e) => setDue(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="amount" className="form-label">Total Amount</label>
            <input
              type="number"
              className="form-control"
              id="amount"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              disabled
            />
          </div>
          
          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default HOC(Add);
