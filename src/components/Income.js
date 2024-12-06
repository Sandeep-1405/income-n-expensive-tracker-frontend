import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router";
import axios from "axios";
import HOC from "./HOC";
import DisplayList from "./DisplayList";
import Calculate from "./Calculate";
import Filter from "./Filter";
import Search from "./Search";
import AddButton from "./AddButton";
import { Link } from "react-router-dom";

const Income = () => {
  const navigate = useNavigate();
  const [displayList, setDisplayList] = useState([] || null);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const owner = localStorage.getItem("owner");
  const type = "income"

  useEffect(() => {
    fetchIncomes();
  }, [owner]);

  const fetchIncomes = () =>{
    if (owner !== "Unknown User") {
      setLoading(true);
      axios
        .get(`http://localhost:3001/get/${owner}/${type}`)
        .then((res) => {
          //console.log(res.data)
          setDisplayList(res.data.List);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching:", error);
          setLoading(false);
        });
    }
  }


  const handleDelete = async (id) => {
    try {
      await axios
        .delete(`http://localhost:3001/${owner}/${type}/${id}`)
        .then(() => {
          //console.log("Income deleted");
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (err) {
      alert("Sorry, Somthing went wrong!!!")
      //console.log(err);
    }
  };

  const onChangeSearch = async (e) => {

    const input = e.target.value;
    setInputText(input);

    if (!input && selectedFilter ==='All') {
      setLoading(true)
      fetchIncomes();
    }else if (input && selectedFilter === 'All'){
      fetchExpBySearchInput(input);
    }
    else{
      fetchExpByCatnSearch(selectedFilter,input);
    }
  };

  const fetchExpensivesByCategory = async(category) =>{

    try{
      setLoading(true)
      const res = await axios.get(`http://localhost:3001/${owner}/${type}/${category}`)
      setDisplayList(res.data.Expensives)
      //console.log(res)
      setLoading(false);
    }catch(error){
      setLoading(false)
      //console.log(error)
      alert('Something went wrong, Please try again later')
      
    }
  }

  const handleFilterChange = async(value) => {

    setSelectedFilter(value);
  
    if (value === 'All' && inputText.length === 0){
      fetchIncomes();
    }else if (inputText && value === 'All'){
      fetchExpBySearchInput(inputText);
    }
    else if (value !== 'All' && inputText.length === 0){
      fetchExpensivesByCategory(value)
    }else{
      fetchExpByCatnSearch(value,inputText)
    }
  };

  const fetchExpBySearchInput = async(inputText) =>{
    try {
      setLoading(true)
      const res = await axios.get(`http://localhost:3001/${owner}/${type}/search/${inputText}`);
      setLoading(false)
      setDisplayList(res.data.Incomes);
    } catch (error) {
      setLoading(false)
      console.error("Error searching:", error);
      alert("Sorry, Somthing went wrong!!!");
    }
  }

  const fetchExpByCatnSearch = async(selectedFilter,inputText) =>{
    //console.log(`${selectedFilter}  ${inputText}`)

    try{
      setLoading(true)
      const res = await axios.get(`http://localhost:3001/${owner}/${type}`,{
        params:{
          category: selectedFilter,
          searchInput:inputText,
        }
      })
      setLoading(false)
      //console.log(res)
      setDisplayList(res.data.Incomes)
    }catch(error){
      setLoading(false)
      alert("Sorry, Somthing went wrong!!!");
      //console.log(error)
    }
  }

  return (
    <div className="container mt-4">
      
      <Calculate displayList={displayList} />

      <div className="row align-items-center mb-4">
        
        <Filter handleFilterChange={handleFilterChange} />
        
        <Search inputText = {inputText} onChangeSearch={onChangeSearch} />

        <AddButton text = "Income" path = "income"/>
      </div>

      <DisplayList loading={loading} displayList={displayList} handleDelete={handleDelete} type={type} />

    </div>
  );
};

export default HOC(Income);
