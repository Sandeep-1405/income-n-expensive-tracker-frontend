import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router';

const AddNotes = () => {
    const [heading, setHeading] = useState('');
    const [description, setDescription] = useState('');
    const owner = localStorage.getItem('owner');
    const type = 'notes'

    const navigate = useNavigate();

    const handleHeadingChange = (e) => {
        setHeading(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try{
            const res = await axios.post(`http://localhost:3001/create`,{heading,description,owner,type});
            //console.log(res)
            navigate('/notes')
            setHeading('');
            setDescription('');
        }catch(error){
            console.log(error)
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-sm-12">
                    <div className="card shadow">
                        <div className="card-body">
                            <h1 className="text-center mb-4">Add Notes</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="heading" className="form-label">
                                        Heading
                                    </label>
                                    <input
                                        type="text"
                                        id="heading"
                                        className="form-control"
                                        value={heading}
                                        onChange={handleHeadingChange}
                                        placeholder="Enter note heading"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        className="form-control"
                                        rows="5"
                                        value={description}
                                        onChange={handleDescriptionChange}
                                        placeholder="Enter note description"
                                        required
                                    ></textarea>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary w-100">
                                        Add Note
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddNotes;
