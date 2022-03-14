import React, { useState } from "react";
import Decoration from "../../../assets/icons/login-leaf-icon.png";
import DecorationMap from "../../../assets/icons/login-pin-icon.png";

import { API } from "../../../config/api";

const FormRegister = () => {
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
            className="flex items-center bg-green-600 rounded-md text-white text-sm px-4 py-3"
            role="alert"
          >
            <p>Successfully registered</p>
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
          className="flex justify-center items-center rounded-md text-red-600 border border-red-600 text-sm font-bold px-4 py-3"
          role="alert"
        >
          <p>Register Failed Try Again</p>
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

            <button
              type="submit"
              className="md:my-4 w-full md:py-2 bg-blueSea rounded text-white"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormRegister;
