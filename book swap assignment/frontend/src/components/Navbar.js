import React from "react"
import {Link} from "react-router-dom"

function Navbar(){

return(

<div style={{background:"#333",padding:"15px"}}>

<Link to="/" style={{color:"white",margin:"10px"}}>Books</Link>
<Link to="/add" style={{color:"white",margin:"10px"}}>Add Book</Link>
<Link to="/login" style={{color:"white",margin:"10px"}}>Login</Link>
<Link to="/register" style={{color:"white",margin:"10px"}}>Register</Link>

</div>

)

}

export default Navbar