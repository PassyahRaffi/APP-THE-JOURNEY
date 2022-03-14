import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo-white.png";
import { ModalLoginContext, ModalRegisterContext } from "../context/context";

const Jumbotron = () => {
  const [openModalRegister, setOpenModalRegister] =
    useContext(ModalRegisterContext);
  const [openModalLogin, setOpenModalLogin] = useContext(ModalLoginContext);

  return (
    <div>
      <nav className="bg-jumbotron bg-no-repeat bg-cover">
        <div className="md:w-9/12 md:m-auto relative md:py-4">
          <div className="absolute md:flex justify-between items-center w-full z-20">
            <Link to="/">
              <img src={Logo} alt="logo" />
            </Link>

            <div className="buttonGroup flex gap-4">
              <button
                onClick={() => setOpenModalLogin(!openModalLogin)}
                className="rounded px-6 py-1 border-2 border-white text-white font-bold"
              >
                Login
              </button>
              <button
                onClick={() => setOpenModalRegister(!openModalRegister)}
                className="rounded px-6 py-2 bg-blue-500 text-white font-bold"
              >
                Register
              </button>
            </div>
          </div>

          <div className="md:py-32">
            <h1 className="text-7xl text-white font-bold ledaing-5">
              The Journey
            </h1>
            <h1 className="text-7xl text-white font-bold ledaing-5">
              you ever dreamed of.
            </h1>
            <p className="text-2xl font-medium text-white md:mt-6">
              We made a tool so you can easily keep & share your travel
              memories. <br /> But there is a lot more
            </p>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Jumbotron;
