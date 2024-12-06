import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const AddCategory = () => {
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const owner = localStorage.getItem('owner');

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, [owner]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/category/${owner}`);
      setCategories(res.data.categories); // Assuming the response contains categories
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    //console.log(category);

    axios
      .post(`http://localhost:3001/category/${owner}`, { category })
      .then((res) => {
        console.log(res.data);
        alert('Category Added');
        setCategory('');
        // Re-fetch categories to include the newly added category
        fetchCategories();
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (categoryId) => {
    axios
      .delete(`http://localhost:3001/${owner}/Categories/${categoryId}`)
      .then((res) => {
        alert('Category Deleted');
        fetchCategories(); // Re-fetch categories to reflect the changes
      })
      .catch((error) => console.log(error));
  };

  const handleUpdate = (categoryId, updatedCategory) => {
    axios
      .put(`http://localhost:3001/category/${owner}/${categoryId}`, {
        category: updatedCategory,
      })
      .then((res) => {
        alert('Category Updated');
        // Update the category in the state
        fetchCategories();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header text-center bg-primary text-white">
              <h2>Add Category</h2>
            </div>
            <div className="card-body">
              <form onSubmit={onSubmitForm}>
                <div className="form-group mb-3">
                  <label htmlFor="categoryInput" className="form-label">
                    Category Name
                  </label>
                  <input
                    type="text"
                    id="categoryInput"
                    className="form-control"
                    placeholder="Enter category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Category Table */}
          <div className="mt-5">
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Category Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, index) => (
                  <tr key={cat.id}>
                    <td>{index + 1}</td>
                    <td>{cat.category}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm mx-2"
                        onClick={() => {
                          const updatedCategory = prompt('Update category name', cat.category);
                          if (updatedCategory) {
                            handleUpdate(cat.id, updatedCategory);
                          }
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(cat.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
