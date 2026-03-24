import React,{useEffect,useState} from "react"
import axios from "axios"

function BookList(){

const [books,setBooks] = useState([])

useEffect(()=>{

axios.get("http://localhost:5000/books")
.then(res=>setBooks(res.data))

},[])

return(

<div>

<h1>Available Books</h1>

{books.map(book=>(
<div key={book._id} style={{
border:"1px solid gray",
margin:"10px",
padding:"10px"
}}>

<h3>{book.title}</h3>
<p>{book.author}</p>
<p>{book.genre}</p>

<button>Request Swap</button>

</div>
))}

</div>

)

}

export default BookList