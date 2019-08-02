import React from "react";
import { Link } from "react-router-dom";
import { Button, Image } from "semantic-ui-react";
function Nav(props) {
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    props.history.push("/");
  }
  if (localStorage.getItem("token")) {
    return (
      <nav className="navigation">
        <div className="logo">
        <Link to="/"><Image
            className="logo__img"
            alt="betterreads logo"
            src={require("../imgs/br-logo.png")}
          /></Link>
        </div>
        <div className="nav-links">
          <Link to="/"> Search</Link>
          <Link to="/saved_books">Saved Books</Link>
          <Link to="/edit_profile">Edit Profile</Link>
          <Button className="button-nav" onClick={logout}>
            Logout
          </Button>
        </div>
      </nav>
    );
  }
  if (!localStorage.getItem("token")) {
    return (
      <nav className="navigation">
        <div className="logo">
        <Link to="/"><Image
            className="logo__img"
            alt="betterreads logo"
            src={require("../imgs/br-logo.png")}
          /></Link>
        </div>
        <div className="nav-links">
          <Link to="/"> Search</Link>
          <Link to="/register"> Register</Link>
          <Link to="/login"> Login</Link>
        </div>
      </nav>
    );
  }
}
Nav.propTypes = {};
export default Nav;
