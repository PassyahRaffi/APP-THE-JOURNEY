import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo-black.png";
import Dropdown from "./Dropdown";

const Navbar = () => {
  return (
    <nav className="shadow-xl py-2">
      <div className="md:flex md:justify-between md:w-9/12 md:m-auto">
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>

        <div>
          <Dropdown />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
