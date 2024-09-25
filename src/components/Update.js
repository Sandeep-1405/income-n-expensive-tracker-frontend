import axios from 'axios';
import React, {useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function Update(){

    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState("");

    const {id} = useParams();
    const navigate  = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        /*if (name.length === 0 || email.length ===0 || dob.length === 0){
            seterrors("All Fields are Mandatory")
        }else{
            axios.put('http://localhost:8081/update/' + id,{name,email,dob})
            .then(res =>{
                //console.log(res);
                navigate('/');
            }).catch(err => console.log(err));
        }*/
    }

    return(
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
                        <label htmlFor="amount" className="form-label">Amount</label>
                        <input
                        type="number"
                        className="form-control"
                        id="amount"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="form-label">Description (Optional)</label>
                        <textarea
                        className="form-control"
                        id="description"
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Submit</button>
                </form>
                <p className='text-danger m-3'>{errors}</p>
            </div>
        </div>
    )
}
export default Update