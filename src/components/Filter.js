import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Filter = ({handleFilterChange}) => {
  const [categories, setCategories] = useState([]);
  const owner = localStorage.getItem('owner');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/${owner}/category`);
        console.log(res);
        setCategories(res.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, [owner]);

  return (
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
  );
};

export default Filter;
