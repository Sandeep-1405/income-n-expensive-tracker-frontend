import React, { useEffect, useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css.css";
import { useNavigate } from "react-router";
import axios from "axios";
import HOC from "./HOC";

const Income = () => {
  const navigate = useNavigate();
  const owner = localStorage.getItem("displayName") || "Unknown User";
  const [displayList, setDisplayList] = useState([]);
  const [inputText, setInputText] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (owner !== "Unknown User") {
      axios
        .get(`http://localhost:3001/workers/${owner}`)
        .then((res) => {
          setDisplayList(res.data.workers);
        })
        .catch((error) => {
          console.error("Error fetching workers:", error);
        });
    }
  }, [owner]);

  useEffect(() => {
    // Fetch categories for filtering
    axios
      .get(`http://localhost:3001/categories`)
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Memoize the calculations of received, totalAmount, and pending
  const { received, totalAmount, pending } = useMemo(() => {
    const received = displayList.reduce((total, worker) => total + parseInt(worker.paid), 0);
    const totalAmount = displayList.reduce((total, worker) => total + parseInt(worker.amount), 0);
    const pending = displayList.reduce((total, worker) => total + parseInt(worker.due), 0);
    return { received, totalAmount, pending };
  }, [displayList]); // Recalculate when displayList changes

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/workers/${id}`).then(() => {
        console.log("Worker deleted");
        window.location.reload();
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onClickBtn = () => {
    navigate("/add");
  };

  const handleSearch = (e) => {
    setInputText(e.target.value);
    const query = e.target.value;

    if (query !== "") {
      // Search by both name and area
      axios
        .post("http://localhost:3001/search", { query })
        .then((res) => {
          setDisplayList(res.data.workers);
        })
        .catch((error) => {
          console.error("Error searching workers:", error);
        });
    } else {
      // If search input is empty, reset to show all workers
      axios
        .get(`http://localhost:3001/workers/${owner}`)
        .then((res) => {
          setDisplayList(res.data.workers);
        })
        .catch((error) => {
          console.error("Error fetching workers:", error);
        });
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    if (e.target.value === "") {
      // If no category selected, show all workers
      axios
        .get(`http://localhost:3001/workers/${owner}`)
        .then((res) => {
          setDisplayList(res.data.workers);
        })
        .catch((error) => {
          console.error("Error fetching workers:", error);
        });
    } else {
      // Filter by selected category
      axios
        .get(`http://localhost:3001/filter-by-category/${e.target.value}`)
        .then((res) => {
          setDisplayList(res.data.workers);
        })
        .catch((error) => {
          console.error("Error fetching workers by category:", error);
        });
    }
  };

  return (
    <div className="container mt-5">
      {/* Add Income Button */}
      <div className="text-center mb-4">
        <button className="btn btn-lg btn-success shadow-sm" onClick={onClickBtn}>
          Add Income
        </button>
      </div>

      {/* Total Received, Pending, and Total Amount */}
      <div className="d-flex justify-content-around mb-4">
        <h6 className="display-6 text-center text-success">
          Received: {received} Rs
        </h6>
        <h6 className="display-6 text-center text-warning">
          Pending: {pending} Rs
        </h6>
        <h3 className="display-6 text-center text-primary">
          Total: {totalAmount} Rs
        </h3>
      </div>

      {/* Search and Filter Controls */}
      <div className="d-flex justify-content-between mb-4">
        <div className="input-group w-50">
          <input
            type="search"
            className="form-control shadow-sm"
            placeholder="Search by Name/Area..."
            aria-label="Search"
            value={inputText}
            onChange={handleSearch} // Use onChange for dynamic search
          />
        </div>

        {/* Category Filter */}
        <div className="d-flex align-items-center">
          <label htmlFor="categoryFilter" className="me-2 text-dark">
            Filter by Category:
          </label>
          <select
            id="categoryFilter"
            className="form-select w-50 shadow-sm"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">All</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Workers Table */}
      <div className="row">
        {displayList.length === 0 ? (
          <div className="col-12">
            <h4 className="text-center text-muted">Workers Details Not Found</h4>
          </div>
        ) : (
          <table className="table table-hover table-bordered text-center shadow-sm">
            <thead className="table-dark">
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
                      <button
                        className="btn btn-warning btn-sm m-1"
                        onClick={() => navigate(`/edit/${worker.id}`)}
                      >
                        Edit
                      </button>
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
        )}
      </div>
    </div>
  );
};

export default HOC(Income);
