import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import HOC from "./HOC";
import DisplayList from "./DisplayList";
import Calculate from "./Calculate";
import Filter from "./Filter";
import Search from "./Search";
import AddButton from "./AddButton";

const Expensive = () => {
  const [displayList, setDisplayList] = useState([] || null);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const owner = localStorage.getItem("owner");
  const type = "expensive"
  const url = process.env.REACT_APP_BACKEND_URL

  useEffect(() => {
    fetchExpensives();
  }, [owner]);

  const fetchExpensives = () =>{
    if (owner !== "Unknown User") {
      setLoading(true);
      axios
        .get(`${url}/get/${owner}/${type}`)
        .then((res) => {
          //console.log(res.data)
          setDisplayList(res.data.List);
          setLoading(false);
        })
        .catch((error) => {
          //console.error("Error fetching workers:", error);
          setLoading(false);
        });
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios
        .delete(`${url}/${owner}/${type}/${id}`)
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

  const onChangeSearch = async (e) => {
    const input = e.target.value;
    setInputText(input);
    fetchByCatnSearch(selectedFilter,input)
  };


  const handleFilterChange = async(value) => {
    setSelectedFilter(value);
    fetchByCatnSearch(value,inputText)
  };


  const fetchByCatnSearch = async(selectedFilter,inputText) =>{
    console.log(`${selectedFilter}  ${inputText}`)

    try{
      setLoading(true)
      const res = await axios.get(`${url}/${owner}/${type}`,{
        params:{
          category: selectedFilter || 'All',
          searchInput:inputText || '',
        }
      })
      setLoading(false)
      console.log(res)
      setDisplayList(res.data.List)
    }catch(error){
      setLoading(false)
      alert("Sorry, Somthing went wrong!!!");
      console.log(error)
    }
  }

  return (
    <div className="container mt-4">
      
      <Calculate displayList={displayList} type={type}/>

      <div className="row align-items-center mb-4">
        
        <Filter handleFilterChange={handleFilterChange} />
        
        <Search inputText = {inputText} onChangeSearch={onChangeSearch} />

        <AddButton text = "Expensive" path = "expensive"/>
      </div>

      <DisplayList loading={loading} displayList={displayList} handleDelete={handleDelete} type={type} />

    </div>
  );
};

export default HOC(Expensive);
