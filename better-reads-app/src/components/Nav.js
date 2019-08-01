import React from "react";
import { Link } from "react-router-dom";
import { Button, Image } from "semantic-ui-react";

function Nav(props) {
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    props.history.push("/");
  }

  return (
    <nav className="navigation">
      <div>
        <div className="logo">
          <Image
            className="logo__img"
            alt="betterreads logo"
            src={require("../imgs/logo_transparent.png")}
          />
        </div>
      </div>

      <div className="nav-links">
        <Link to="/"> Search</Link>
        <Link to="/register"> Register</Link>
        <Link to="/login"> Login</Link>

        {localStorage.getItem("token") && (
          <>
            <Link to="/saved_books">Saved Books</Link>
            <Button className="button-nav" onClick={logout}>
              Logout
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
Nav.propTypes = {};
export default Nav;
