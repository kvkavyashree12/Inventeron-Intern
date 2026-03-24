import React,{useState} from "react";
import axios from "axios";

function Login(){

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const login = async()=>{

try{

const res = await axios.post("http://localhost:5000/users/login",{
email,
password
});

alert(res.data);

}catch{

alert("Login failed");

}

};

return(

<div className="container">

<div className="form-box">

<h2>Login</h2>

<input
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={login}>Login</button>

</div>

</div>

);

}

export default Login;