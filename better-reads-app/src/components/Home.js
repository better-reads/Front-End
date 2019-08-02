import React, { useState, useEffect } from "react";
import { Button, Input, Form, Dimmer, Loader } from "semantic-ui-react";

import styled from "styled-components";

import axios from "axios";
import RecommendedBooks from "./RecommendedBooks";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80%;
  margin: 2% auto;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const HomeImage = styled.img`
  max-height: 200px;
  width: 300px;
  padding: 0px;
  @media (max-width: 600px) {
    margin: auto;
  }
`;

function Home({
  savedBookList,
  setSavedBookList,
  recommendedBooks,
  setRecommendedBooks,
}) {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const userId = localStorage.getItem("user_id");

  function handleSubmit(e) {
    e.preventDefault();
    setSearchTerm(searchInput);
  }
  function handleChanges(e) {
    setSearchInput(e.target.value);
  }

  // search books
  useEffect(() => {
    if (searchTerm) {
      setIsLoading(true);
      axios
        .post("https://better-reads-db.herokuapp.com/api/books/recommend", {
          description: searchTerm,
        })
        .then(res => {
          setRecommendedBooks(res.data.list);
          setSearchTerm("");
          setIsLoading(false);
        })
        .catch(err => console.error(err));
    }
  }, [searchTerm, setRecommendedBooks]);

  // get users savedbooklist
  useEffect(() => {
    if (localStorage.getItem("user_id")) {
      axios
        .get(`https://better-reads-db.herokuapp.com/api/users/list/${userId}`)
        .then(res => {
          setSavedBookList(res.data);
        })
        .catch(err => console.error(err));
    }
  }, [setSavedBookList, userId]);

  return (
    <div style={{ minHeight: "80vh" }}>
      <Wrapper>
        <HomeImage src={require("../imgs/undraw_reading_0re1.svg")} fluid />
        <div
          style={{
            alignSelf: "center",
            fontSize: "1.3rem",
            maxWidth: "550px",
            lineHeight: "1.6em",
          }}>
          <h3 style={{ marginBottom: "50px" }}>
            Welcome{" "}
            {localStorage.getItem("username") &&
              `${localStorage.getItem("username")}`}
          </h3>
          <h1>Search for books</h1>
          <p>
            Describe your perfect novel and let us find the best books for you.
          </p>
        </div>
      </Wrapper>
      <Form onSubmit={handleSubmit}>
        <Form.Field style={{ padding: "3% 15% 2% 15%" }}>
          <Input
            icon="search"
            name="description"
            placeholder="Search.."
            value={searchInput}
            onChange={handleChanges}
          />
        </Form.Field>
        <Button>Search</Button>
      </Form>
      {isLoading ? (
        <Dimmer inverted active>
          <Loader inverted> Loading </Loader>
        </Dimmer>
      ) : (
        recommendedBooks.length !== 0 && (
          <RecommendedBooks
            recommendedBooks={recommendedBooks}
            savedBookList={savedBookList}
            setSavedBookList={setSavedBookList}
          />
        )
      )}
    </div>
  );
}

Home.propTypes = {};

export default Home;
