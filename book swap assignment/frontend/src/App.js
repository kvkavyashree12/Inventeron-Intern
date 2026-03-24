import React from "react"
import {BrowserRouter,Routes,Route} from "react-router-dom"

import Navbar from "./components/Navbar"
import Register from "/components/Register"
import Login from "/components/Login"
import AddBook from "/components/AddBook"
import BookList from "/components/BookList"

function App(){

return(

<BrowserRouter>

<Navbar/>

<Routes>

<Route path="/" element={<BookList/>}/>
<Route path="/add" element={<AddBook/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>

</Routes>

</BrowserRouter>

)

}

export default App