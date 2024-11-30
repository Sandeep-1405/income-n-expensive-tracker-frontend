import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import HOC from './HOC';

function Update(){

    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [area, setArea] = useState("");
    const [paid, setPaid] = useState(0);
    const [due, setDue] = useState(0);
    const [amount, setAmount] = useState(0);

    const {id} = useParams();
    const navigate  = useNavigate();

    const email = localStorage.getItem('email') || "Not loggedIn ";
    const owner = email.replace('@gmail.com',"")

    //console.log(id)

    useEffect(()=>{
        setAmount(parseInt(paid) + parseInt(due))
    },[paid,due])

    useEffect(()=>{
        const fetchData = async()=>{
            await axios.get(`http://localhost:3001/${owner}/expensive/${id}`)
            .then(res =>{
                //console.log(res.data.Expensive);
                setName(res.data.Expensive.name)
                setDate(res.data.Expensive.date)
                setArea(res.data.Expensive.area)
                setPaid(res.data.Expensive.paid)
                setDue(res.data.Expensive.due)
                setAmount(res.data.Expensive.amount)
            }).catch(err => console.log(err));
        }
        fetchData();
    },[id])

    function handleSubmit(event){
        event.preventDefault();
        axios.put(`http://localhost:3001/${owner}/expensive/${id}`,{name,date,area,paid,due,amount})
        .then(res =>{
            //console.log(res);
            navigate('/expens');
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
                    <label htmlFor="paid" className="form-label">Paid</label>
                    <input
                    type="number"
                    className="form-control"
                    id="paid"
                    placeholder="Enter paid amount"
                    value={paid}
                    onChange={(e) => setPaid(e.target.value)}
                    required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="due" className="form-label">Due</label>
                    <input
                    type="number"
                    className="form-control"
                    id="due"
                    placeholder="Enter due amount"
                    value={due}
                    onChange={(e) => setDue(e.target.value)}
                    required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Total Amount</label>
                    <input
                    type="number"
                    className="form-control"
                    id="amount"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    disabled
                    />
                </div>
                
                <button type="submit" className="btn btn-primary w-100">Submit</button>
            </form>
            </div>
        </div>
    )
}
export default HOC(Update)