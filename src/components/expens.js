import React, { useEffect, useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import HOC from "./HOC";

const Expens = () => {
  const navigate = useNavigate();
  const [displayList, setDisplayList] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const email = localStorage.getItem("email") || "Not loggedIn";
  const owner = email.replace("@gmail.com", "");

  useEffect(() => {
    fetchExpensives();
  }, [owner]);

  const fetchExpensives = () =>{
    if (owner !== "Unknown User") {
      setLoading(true);
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
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/${owner}/category`);
        setCategories(res.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [owner]);

  const paid = useMemo(
    () => displayList.reduce((total, worker) => total + parseInt(worker.paid), 0),
    [displayList]
  );
  const totalAmount = useMemo(
    () => displayList.reduce((total, worker) => total + parseInt(worker.amount), 0),
    [displayList]
  );
  const due = useMemo(
    () => displayList.reduce((total, worker) => total + parseInt(worker.due), 0),
    [displayList]
  );

  const handleDelete = async (id) => {
    try {
      await axios
        .delete(`http://localhost:3001/${owner}/expensive/${id}`)
        .then(() => {
          console.log("Worker deleted");
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeSearch = async (e) => {

    const input = e.target.value;
    setInputText(input);

    if (!input && selectedFilter ==='All') {
      setLoading(true)
      try {
        const res = await axios.get(`http://localhost:3001/expensives/${owner}`);
        setLoading(false)
        setDisplayList(res.data.Expensives);
      } catch (error) {
        setLoading(false)
        console.error("Error fetching all data:", error);
      }
      return;
    }else if (input.length !== 0 && selectedFilter === 'All'){
      try {
        setLoading(true)
        const res = await axios.get(`http://localhost:3001/${owner}/search/${input}`);
        setLoading(false)
        setDisplayList(res.data.Expensives);
      } catch (error) {
        setLoading(false)
        console.error("Error searching:", error);
      }
    }
    else{
      fetchExpByCatnSearch(selectedFilter,input);
    }
  };

  const fetchExpensivesByCategory = async(category) =>{

    try{
      setLoading(true)
      const res = await axios.get(`http://localhost:3001/${owner}/expensives/${category}`)
      setDisplayList(res.data.Expensives)
      console.log(res)
      setLoading(false);
    }catch(error){
      setLoading(false)
      console.log(error)
      alert('Something went wrong, Please try again later')
      
    }
  }

  const handleFilterChange = (value) => {
    setSelectedFilter(value);
    if (value === 'All' && inputText.length === 0){
      fetchExpensives();
    }else if (value !== 'All' && inputText.length === 0){
      fetchExpensivesByCategory(value)
    }else{
      fetchExpByCatnSearch(value,inputText)
    }
  };

  const fetchExpByCatnSearch = async(selectedFilter,inputText) =>{
    console.log(`${selectedFilter}  ${inputText}`)

    try{
      setLoading(true)
      const res = await axios.get(`http://localhost:3001/${owner}/expensives`,{
        params:{
          category: selectedFilter,
          searchInput:inputText,
        }
      })
      setLoading(false)
      console.log(res)
      setDisplayList(res.data.Expensives)
    }catch(error){
      setLoading(false)
      console.log(error)
    }
  }

  return (
    <div className="container mt-4">
      

      {/* Paid, Due, and Total */}
      <div className="row text-center mb-4">
        <div className="col-4">
          <div className="p-3 bg-light shadow rounded">
            <h5 className="text-success">Paid</h5>
            <p className="fs-5 fw-bold">{paid} Rs</p>
          </div>
        </div>
        <div className="col-4">
          <div className="p-3 bg-light shadow rounded">
            <h5 className="text-danger">Due</h5>
            <p className="fs-5 fw-bold">{due} Rs</p>
          </div>
        </div>
        <div className="col-4">
          <div className="p-3 bg-light shadow rounded">
            <h5 className="text-primary">Total</h5>
            <p className="fs-5 fw-bold">{totalAmount} Rs</p>
          </div>
        </div>
      </div>

      {/* Search, Category Filter, and Add Category Button */}
      <div className="row align-items-center mb-4">
        <div className="col-lg-4 col-md-6 mb-3 mb-lg-0 d-md-flex">
          <label htmlFor="select" className="form-label fw-bold m-2">
            Category:
          </label>
          <select
            className="form-select"
            aria-label="Select category"
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="All" defaultValue="All" >All</option>
            {categories.map((category) => (
              <option value={category.category} key={category.id}>
                {category.category}
              </option>
            ))}
          </select>
        </div>

        <div className="col-lg-6 col-md-6 mb-3 mb-lg-0">
          <input
            type="search"
            className="form-control"
            placeholder="Search by Name/Area..."
            value={inputText}
            onChange={(e) => onChangeSearch(e)}
          />
        </div>

        <div className="col-lg-2 text-md-end text-center">
          <button className="btn btn-primary w-100" onClick={() => navigate("/add")}>
            Add Expensive
          </button>
        </div>
      </div>

      {/* Display Table */}
      {loading ? (
        <div className="text-center">
          <h4>Loading...</h4>
        </div>
      ) : displayList.length === 0 ? (
        <div className="text-center">
          <h4 className="text-muted">No Expensives Found</h4>
        </div>
      ) : (
        <table className="table table-striped text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Area</th>
              <th>Date</th>
              <th>Category</th>
              <th>Paid</th>
              <th>Due</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayList
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((worker) => (
                <tr key={worker.id}>
                  <td>{worker.name}</td>
                  <td>{worker.area}</td>
                  <td>{worker.date}</td>
                  <td>{worker.category}</td>
                  <td>{worker.paid}</td>
                  <td>{worker.due}</td>
                  <td>{worker.amount}</td>
                  <td>
                    <Link to={`/edit/${worker.id}`} className="btn btn-warning btn-sm me-2">
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(worker.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HOC(Expens);
