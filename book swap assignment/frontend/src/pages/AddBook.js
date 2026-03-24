import React,{useState} from "react";
import axios from "axios";

function AddBook(){

const [title,setTitle]=useState("");
const [author,setAuthor]=useState("");

const addBook = async()=>{

await axios.post("http://localhost:5000/books/add",{
title,
author
});

alert("Book added");

};

return(

<div className="container">

<div className="form-box">

<h2>Add Book</h2>

<input
placeholder="Book Title"
onChange={(e)=>setTitle(e.target.value)}
/>

<input
placeholder="Author"
onChange={(e)=>setAuthor(e.target.value)}
/>

<button onClick={addBook}>Add Book</button>

</div>

</div>

);

}

export default AddBook;