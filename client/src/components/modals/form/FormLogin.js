import React, { useContext, useState } from "react";
import Decoration from "../../../assets/icons/login-leaf-icon.png";
import DecorationMap from "../../../assets/icons/login-pin-icon.png";
import { UserContext } from "../../../context/userContext";
import { LoginContext, ModalLoginContext } from "../../../context/context";
import { API } from "../../../config/api";

const FormLogin = () => {
  const [openModalLogin, setOpenModalLogin] = useContext(ModalLoginContext);
  const [login, setLogin] = useContext(LoginContext);
  const [state, dispatch] = useContext(UserContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(form);
      const response = await API.post("/login", body, config);

      if (response?.status === 200) {
        // Send data to useContext
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data.user,
        });

        setLogin(!login);
        setOpenModalLogin(!openModalLogin);

        // setOpen(false);
        // // Status check
        // if (response.data.data.user.status === "admin") {
        //   navigate("/");
        //   setAdmin(true);
        // } else {
        //   navigate("/");
        //   setAdmin(false);
        //   console.log(response);
        //   // console.log(response);
        // }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        <img src={Decoration} alt="" className="absolute right-0 top-0" />
        <img src={DecorationMap} alt="" className="absolute top-0 left-0" />
        <div className="md:my-8">
          <h1 className="text-3xl text-center font-semibold">Login</h1>
        </div>

        <div className="md:mx-20 md:my-16">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name" className="flex flex-col font-bold md:mb-2">
              Email
              <input
                value={email}
                name="email"
                onChange={handleChange}
                type="email"
                className="border-2 py-1 px-2 rounded"
              />
            </label>
            <label htmlFor="name" className="flex flex-col font-bold md:mb-2">
              Password
              <input
                name="password"
                value={password}
                onChange={handleChange}
                type="password"
                className="border-2 py-1 px-2 rounded"
              />
            </label>

            <button
              type="submit"
              className="md:my-4 w-full md:py-2 bg-blueSea rounded text-white"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
