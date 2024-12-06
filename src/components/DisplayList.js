import React from 'react';
import { Link } from 'react-router-dom';

const DisplayList = ({loading,displayList,handleDelete,type}) => {
    
    return (
        <div>
            {loading ? (
                <div className="text-center">
                <h4>Loading...</h4>
                </div>
            ) : displayList.length === 0 ? (
                <div className="text-center">
                <h4 className="text-muted">No Data Found</h4>
                </div>
            ) : (
                <table className="table table-striped text-center">
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Area&Crop</th>
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
                    .map((data) => (
                        <tr key={data.id}>
                        <td>{data.name}</td>
                        <td>{data.area}</td>
                        <td>{data.date}</td>
                        <td>{data.category}</td>
                        <td>{data.paid}</td>
                        <td>{data.due}</td>
                        <td>{data.amount}</td>
                        <td>
                            <Link to={`/${type}/update/${data.id}`} className="btn btn-warning btn-sm me-2">
                            Edit
                            </Link>
                            <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(data.id)}
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

export default DisplayList;