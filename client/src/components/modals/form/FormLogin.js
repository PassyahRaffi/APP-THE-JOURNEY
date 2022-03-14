import React, { useContext, useState } from "react";
import Decoration from "../../../assets/icons/login-leaf-icon.png";
import DecorationMap from "../../../assets/icons/login-pin-icon.png";
import { UserContext } from "../../../context/userContext";
import { LoginContext, ModalLoginContext, ModalRegisterContext } from "../../../context/context";
import { API } from "../../../config/api";
import { LockClosedIcon } from "@heroicons/react/solid";

const FormLogin = () => {
  const [openModalRegister, setOpenModalRegister] = useContext(ModalRegisterContext)
  const [openModalLogin, setOpenModalLogin] = useContext(ModalLoginContext);
  const [login, setLogin] = useContext(LoginContext);
  const [state, dispatch] = useContext(UserContext);
  const [message, setMessage] = useState(null);

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
        const alert = (
          <div
            class="flex items-center text-white bg-green-500 rounded-lg py-2 text-md justify-center font-bold"
            role="alert"
          >
            <p>Login Success</p>
          </div>
        );
        setMessage(alert);
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data.user,
        });

        setLogin(!login);
        setOpenModalLogin(!openModalLogin);
      }
    } catch (error) {
      const alert = (
        <div
          class="flex items-center text-white bg-red-500 rounded-lg py-2 text-md justify-center font-bold"
          role="alert"
        >
          <p>Failed To login. Try Again</p>
        </div>
      );
      setMessage(alert);
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
        {message && message}
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

            <div className="text-center">
              <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blueSea hover:bg-brand-red">
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-red-500 group-hover:text-red-400"
                    aria-hidden="true"
                  />
                </span>
                Login
              </button>
              <p className="font-['Avenir-Book'] mt-3">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="font-bold hover:text-red-500"
                  onClick={() => setOpenModalRegister(!openModalRegister)}
                >
                  Click Here
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
