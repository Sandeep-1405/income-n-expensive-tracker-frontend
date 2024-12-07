import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HOC from './HOC';

const Filter = ({ handleFilterChange }) => {
  const [categories, setCategories] = useState([]);  // Default to an empty array
  const [loading, setLoading] = useState(true);  // For loading state
  const [error, setError] = useState(null);  // For error state
  const owner = localStorage.getItem('owner');
  const url = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);  // Start loading
        const res = await axios.get(`${url}/category/${owner}`);
        setCategories(res.data.categories || []);  // Ensure categories is always an array
      } catch (error) {
        setError('Error fetching categories');
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);  // Stop loading
      }
    };
    fetchCategories();
  }, [owner, url]);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="col-lg-4 col-md-6 mb-3 mb-lg-0 d-md-flex">
      <label htmlFor="select" className="form-label fw-bold m-2">
        Category:
      </label>
      <select
        id="select"
        className="form-select"
        aria-label="Select category"
        onChange={(e) => handleFilterChange(e.target.value)}
      >
        <option value="All" defaultValue="All">All</option>
        {categories.length === 0 ? (
          <option disabled>No categories available</option>
        ) : (
          categories.map((category) => (
            <option value={category.category} key={category.id}>
              {category.category}
            </option>
          ))
        )}
      </select>
    </div>
  );
};

export default HOC(Filter);
