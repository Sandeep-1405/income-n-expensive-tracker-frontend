import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HOC from './HOC';

function Update() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [area, setArea] = useState('');
  const [paid, setPaid] = useState(0);
  const [due, setDue] = useState(0);
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const email = localStorage.getItem('email') || 'Not loggedIn';
  const owner = email.replace('@gmail.com', '');

  useEffect(() => {
    setAmount(parseInt(paid) + parseInt(due));
  }, [paid, due]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/${owner}/expensive/${id}`);
        setName(res.data.Expensive.name);
        setDate(res.data.Expensive.date);
        setArea(res.data.Expensive.area);
        setPaid(res.data.Expensive.paid);
        setDue(res.data.Expensive.due);
        setAmount(res.data.Expensive.amount);
        setCategory(res.data.Expensive.category); // Set the category from the data
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, owner]);

  useEffect(() => {
    // Fetch categories to populate the select dropdown
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/${owner}/category`);
        setCategories(res.data.categories); // Assuming response contains a list of categories
      } catch (err) {
        console.log('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, [owner]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:3001/${owner}/expensive/${id}`, { name, date, area, paid, due, amount, category })
      .then((res) => {
        navigate('/expens');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
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

          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <select
              id="category"
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.category}>
                  {category.category}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default HOC(Update);
