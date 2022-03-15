import React, { useState, useContext } from "react";
import Decoration from "../../../assets/icons/login-leaf-icon.png";
import DecorationMap from "../../../assets/icons/login-pin-icon.png";
import { ModalLoginContext } from "../../../context/context";
import { LockClosedIcon } from "@heroicons/react/solid";

import { API } from "../../../config/api";

const FormRegister = () => {
  const [openModalLogin, setOpenModalLogin] = useContext(ModalLoginContext);
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const { name, email, password, phone } = form;
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
      const response = await API.post("/register", body, config);

      if (response.data.status === "success") {
        const alert = (
          <div
          className="flex justify-center items-center rounded-md bg-green-600 text-white text-sm font-bold px-4 py-3"
            role="alert"
          >
            <p>Successfully Registered</p>
          </div>
        );
        setMessage(alert);
        setForm({
          name: "",
          email: "",
          password: "",
          phone: "",
        });
      } else {
        const alert = (
          <div
          className="flex justify-center items-center bg-red-600 text-white text-sm font-bold px-4 py-3"
            role="alert"
          >
            <p>{response.message}</p>
          </div>
        );
        console.log(response);
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <div
        className="flex justify-center items-center rounded-md bg-red-600 text-white text-sm font-bold px-4 py-3"
          role="alert"
        >
          <p>Register Failed Try Again!</p>
        </div>
      );
      console.log(error);
      setMessage(alert);
    }
  };

  return (
    <div>
      <div>
        <img src={Decoration} alt="" className="absolute right-0 top-0" />
        <img src={DecorationMap} alt="" className="absolute top-0 left-0" />
        <div className="md:my-8">
          <h1 className="text-3xl text-center font-semibold">Register</h1>
        </div>
        {message && message}
        <div className="md:mx-20 md:my-16">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name" className="flex flex-col font-bold md:mb-2">
              Name
              <input
                name="name"
                value={name}
                onChange={handleChange}
                type="text"
                className="border-2 py-1 px-2 rounded"
              />
            </label>
            <label htmlFor="name" className="flex flex-col font-bold md:mb-2">
              Phone Number
              <input
                name="phone"
                value={phone}
                onChange={handleChange}
                type="text"
                className="border-2 py-1 px-2 rounded"
              />
            </label>
            <label htmlFor="name" className="flex flex-col font-bold md:mb-2">
              Email
              <input
                name="email"
                value={email}
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

            <div className="text-center mt-4">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blueSea hover:bg-brand-red"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-red-500 group-hover:text-red-400"
                    aria-hidden="true"
                  />
                </span>
                Register
              </button>
              <p className="font-['Avenir-Book'] mt-3">
                Already have an account?{" "}
                <button
                  type="button"
                  className="font-bold hover:text-red-500"
                  onClick={() => setOpenModalLogin(!openModalLogin)}
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

export default FormRegister;
