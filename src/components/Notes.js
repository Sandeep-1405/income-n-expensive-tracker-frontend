import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const owner = localStorage.getItem('owner');
    const url = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await axios.get(`${url}/get/${owner}/notes`);
                //console.log(res.data);
                setNotes(res.data.List);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchNotes();
    }, []);

    const handleDelete = async (id) => {
        try {
          await axios
            .delete(`${url}/${owner}/notes/${id}`)
            .then(() => {
              //console.log("Income deleted");
              window.location.reload();
            })
            .catch((error) => {
              //console.error(error);
            });
        } catch (err) {
          alert("Sorry, Somthing went wrong!!!")
          //console.log(err);
        }
      };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-primary">Notes</h1>
                <Link to="/add-note" className="btn btn-primary">
                    Add Note
                </Link>
            </div>

            {loading ? (
                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: '50vh' }}
                >
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : notes.length > 0 ? (
                <div className="row">
                    {notes.map((note) => (
                        <div key={note.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                            <div className="card shadow-sm h-100">
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title text-primary">{note.heading}</h5>
                                    <p className="card-text text-muted">{note.description}</p>
                                    <div className="mt-auto d-flex justify-content-between">
                                        <Link
                                            to={`/notes/update/${note.id}`}
                                            className="btn btn-outline-primary btn-sm"
                                        >
                                            Update
                                        </Link>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(note.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center mt-5">
                    <p className="text-muted">
                        No notes available. Click "Add Note" to create one!
                    </p>
                </div>
            )}
        </div>
    );
};

export default Notes;
