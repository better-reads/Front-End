import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Header, Dimmer, Loader, Icon } from "semantic-ui-react";

const BookModal = ({ isbn }) => {
  const [book, setBook] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [foundStatus, setFoundStatus] = useState(null);
  useEffect(() => {
    if (isbn) {
      Axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`,
      ).then(data => {
        setBook(data.data.items[0].volumeInfo);
        setFoundStatus(true);
        setIsLoading(false);
      }).catch(err => {
        setFoundStatus(false);
        setIsLoading(false);
        console.error(err);
      });
    }
  }, [isbn]);
  if (isLoading) {
  return  (
    <Dimmer inverted active>
      <Loader inverted> Loading </Loader>
    </Dimmer>
    )
  }
 if (isLoading === false && foundStatus === true) {
   return (
    <>
      <Header>
        {book.title} <Header sub>{book.authors}</Header>{" "}
      </Header>
      <h5>Description: </h5>
      <p>{book.description}</p>
      <p>{book.pageCount} pages</p>
      {book.averageRating ? <p>Rating: {book.averageRating}/5</p> : null}

      <a href={book.previewLink}
        style={{ display: "table-cell" }}
        target="_blank"
        rel="noopener noreferrer"
        >
        <Icon className="google" color="blue" />
      </a>

      <a href={`https://www.goodreads.com/search?q=${isbn}`}
      style={{ display: "table-cell" }}
      target="_blank"
      rel="noopener noreferrer">
        <Icon className="goodreads g" color="yellow" />
      </a>

      <a href={`https://www.amazon.com/s?k=${isbn}&i=stripbooks&ref=nb_sb_noss`}
      style={{ display: "table-cell" }}
      target="_blank"
      rel="noopener noreferrer">
        <Icon className="amazon" color="orange" />
      </a>
    </>
  );
}
if (isLoading === false && foundStatus === false) {
  return (
   <>
     <Header>
      Well this is awkward...
     </Header>
     <p>Sorry... our sales endpoint couldn't find details for this book. Please try another</p>
   </>
 );
}
};

export default BookModal;
