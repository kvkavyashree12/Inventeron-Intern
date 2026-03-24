import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {

  const [books, setBooks] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:5000/books/all")
      .then(res => {
        setBooks(res.data);
      })
      .catch(err => {
        console.log("Axios Error:", err);
      });

  }, []);

  return (

    <div className="container">

      <h2>Available Books</h2>

      {books.map(book => (

        <div className="book-card" key={book._id}>

          <h3>{book.title}</h3>
          <p>Author: {book.author}</p>

          <button>Request Swap</button>

        </div>

      ))}

    </div>

  );

}

export default Home;