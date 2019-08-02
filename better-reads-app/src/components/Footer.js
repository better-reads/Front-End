import React from "react";
import { Image } from "semantic-ui-react";

function Footer(props) {
  return (
    <footer className="footer">
        <div className="logo">
          <Image
            className="logo__img"
            alt="betterreads logo"
            src={require("../imgs/br-logo.png")}
          />
        </div>

        <div className="nav-links">
          <p className="copyright">&copy;2019</p>
        </div>
    </footer>
  );
}

export default Footer;
