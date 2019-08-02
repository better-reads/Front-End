import React from "react";
import { Link } from "react-router-dom";
import { Image } from "semantic-ui-react";

function Footer(props) {
  return (
    <footer>
      <div className="footer">
        {/* <div> */}
        <div className="logo">
        <Link to="/"><Image
            className="logo__img"
            alt="betterreads logo"
            src={require("../imgs/br-logo.png")}
          /></Link>
        </div>
        {/* </div> */}

        <div className="nav-links">
          <p className="copyright">&copy;2019</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
