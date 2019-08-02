import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Input, Button, Image, Form } from "semantic-ui-react";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  function handleLogin(e) {
    e.preventDefault();
    setUser({ username, password });
  }

  useEffect(() => {
    if (user) {
      axios
        .post("https://better-reads-db.herokuapp.com/api/auth/login", user)
        .then(res => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user_id", res.data.user.id);
          localStorage.setItem("username", res.data.user.username);
          setUsername("");
          setPassword("");
        })
        .then(res => props.history.push("/"))
        .catch(err => console.error(err));
    }
  }, [props.history, user]);

  return (
    <>
      <Image
        src={require("../imgs/undraw_book_lover_mkck.svg")}
        style={{ maxHeight: "400px", padding: "20px" }}
        fluid
      />

      <div className="buttons">
        <Form className="form" onSubmit={handleLogin}>
          <div className="inputForm">
            <Input
              className="input"
              name="username"
              placeholder="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="inputForm">
            <Input
              className="input"
              autocomplete="off"
              name="password"
              placeholder="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="button">
            <Button>Login</Button>
          </div>
          <div>
            Don't have an account yet?
            <Link to="/register"> Register</Link>
          </div>
        </Form>
      </div>
    </>
  );
}

Login.propTypes = {};

export default Login;
