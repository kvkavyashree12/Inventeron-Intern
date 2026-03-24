import React,{useState} from "react"
import axios from "axios"

function Register(){

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const register = async()=>{

await axios.post("http://localhost:5000/users/register",{
name,
email,
password
})

alert("Registered Successfully")

}

return(

<div>

<h2>Register</h2>

<input placeholder="Name" onChange={(e)=>setName(e.target.value)}/>
<br/>

<input placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
<br/>

<input placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
<br/>

<button onClick={register}>Register</button>

</div>

)

}

export default Register