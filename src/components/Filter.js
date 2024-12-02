import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Filter = () => {
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
    <div className="">
      <div className="">
        <div className="">
          <div className="d-flex justify-content-between">
            <h3>Filter</h3>
            <div className='d-flex '>
                <label htmlFor='select' className='m-2'>Category</label>
            
                <select className="form-select" aria-label="Select category">
                <option value="">All</option>
                {categories.map((category) => (
                    <option value={category.id} key={category.id}>
                    {category.category}
                    </option>
                ))}
                </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
