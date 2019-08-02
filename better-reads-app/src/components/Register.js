import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Input, Image, Form } from "semantic-ui-react";

function Register({ history }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newUser, setNewUser] = useState(null);

  function handleRegister(e) {
    e.preventDefault();
    setNewUser({ username, password });
  }

  useEffect(() => {
    if (newUser) {
      axios
        .post(
          "https://better-reads-db.herokuapp.com/api/auth/register",
          newUser,
        )
        .then(res => {
          setUsername("");
          setPassword("");
        })
        // logs you in after a successful register
        .then(
          () =>
            axios
              .post(
                "https://better-reads-db.herokuapp.com/api/auth/login",
                newUser,
              )
              .then(res => {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user_id", res.data.user.id);
                localStorage.setItem("username", res.data.user.username);
                localStorage.getItem("token") && history.push("/");
              }),
        )
        .catch(err => console.log(err));
    }
  }, [newUser, history]);

  return (
    <>
      <Image
        src={require("../imgs/undraw_reading_list_4boi.svg")}
        style={{ maxHeight: "400px", padding: "20px" }}
        fluid
      />

      <div className="buttons">
        <Form className="form" onSubmit={handleRegister}>
          <div className="inputForm">
            <Input
              className="input"
              name="username"
              placeholder="username"
              required
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
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="button">
            <Button>Register</Button>
          </div>
          <div>
            Already have an Account?
            <Link to="/login"> Login</Link>
          </div>
        </Form>
      </div>
    </>
  );
}

Register.propTypes = {};

export default Register;
