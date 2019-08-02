import React, { useState, useEffect } from "react";
import Book from "./Book.js";
import Axios from "axios";

function SavedBooks({ savedBookList, setSavedBookList }) {
  const [savedBooks, setSavedBooks] = useState([]);
  const userId = localStorage.getItem("user_id");
  useEffect(() => {
    Axios.get(`https://better-reads-db.herokuapp.com/api/users/list/${userId}`)
      .then(res => {
        setSavedBooks(res.data);
      })
      .catch(err => console.error(err));
  }, [userId]);
  
  return (
    <div>
      <h1> Saved Books </h1>
      <div
      className="bookFlexWrapper"
      style={{
        display: "flex",
        flexWrap: "wrap",
        margin: "40px auto",
        maxWidth: "1000px",
        padding: "0 20px",
        justifyContent: "center",
      }}>
      {savedBooks.map(savedBook => (
        <Book
          key={savedBook.id}
          book={savedBook}
          savedBookList={savedBookList}
          setSavedBookList={setSavedBookList}
        />
      ))}
      </div>
    </div>
  );
}

export default SavedBooks;
