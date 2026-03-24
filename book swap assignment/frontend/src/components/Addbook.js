import React,{useState} from "react"
import axios from "axios"

function AddBook(){

const [title,setTitle] = useState("")
const [author,setAuthor] = useState("")
const [genre,setGenre] = useState("")

const addBook = async()=>{

await axios.post("http://localhost:5000/books/add",{
title,
author,
genre
})

alert("Book Added")

}

return(

<div>

<h2>Add Book</h2>

<input placeholder="Title" onChange={(e)=>setTitle(e.target.value)}/>
<br/>

<input placeholder="Author" onChange={(e)=>setAuthor(e.target.value)}/>
<br/>

<input placeholder="Genre" onChange={(e)=>setGenre(e.target.value)}/>
<br/>

<button onClick={addBook}>Add Book</button>

</div>

)

}

export default AddBook