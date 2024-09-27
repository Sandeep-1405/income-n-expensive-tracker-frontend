import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import HOC from './HOC';

function Update(){

    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [area, setArea] = useState("");
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState("");

    const {id} = useParams();
    const navigate  = useNavigate();

    console.log(id)

    useEffect(()=>{
        const fetchData = async()=>{
            await axios.get('http://localhost:3001/worker/'+id)
            .then(res =>{
                //console.log(res.data.worker);
                setName(res.data.worker.name)
                setDate(res.data.worker.date)
                setArea(res.data.worker.area)
                setAmount(res.data.worker.amount)
                setDescription(res.data.worker.description)
            }).catch(err => console.log(err));
        }
        fetchData();
    },[])

    function handleSubmit(event){
        event.preventDefault();
        axios.put('http://localhost:3001/worker/' + id,{name,date,area,amount,description})
        .then(res =>{
            //console.log(res);
            navigate('/');
        }).catch(err => console.log(err));
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
                        <label htmlFor="area" className="form-label">Area</label>
                        <input
                        type="text"
                        className="form-control"
                        id="area"
                        placeholder="Enter Area"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
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
            </div>
        </div>
    )
}
export default HOC(Update)