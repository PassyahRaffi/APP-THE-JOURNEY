import { useContext, useState } from "react";
import { API } from "../config/api";

import { UserContext } from "../context/userContext";

export default function EditProfile() {
  const [message, setMessage] = useState(null);
  const [state, dispatch] = useContext(UserContext);
  const [form, setForm] = useState({
    name: state.user.name,
    email: state.user.email,
    phone: state.user.phone ? state.user.phone : "",
  });

  const { name, email, phone, image } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.patch(`/user/${state.user.id}`, body, config);

      const alert = (
        <div
          className="bg-green-400 rounded-md text-center text-sm px-4 py-3 mt-4 font-bold"
          role="alert"
        >
          <p>Changes Saved!</p>
        </div>
      );
      setMessage(alert);
      setTimeout(() => {
        setMessage(null);
      }, 4000);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-14 mx-4 lg:mx-40">
      <h1 className="text-3xl font-['Avenir-Black'] font-extrabold text-brand-red mb-8">
        Edit Profile
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="space-y-6 mb-8">
          <label htmlFor="name" className="block">
          <span class="block text-sm font-medium text-slate-700 md:mb-2">
              Name
            </span>
            <input
              type="text"
              name="name"
              id="name"
              required
              onChange={handleChange}
              onInvalid={(e) => e.target.setCustomValidity("Name required.")}
              onInput={(e) => e.target.setCustomValidity("")}
              placeholder="Input Name"
              value={name}
              className="w-full p-3 outline outline-2 outline-gray-400 focus:outline-black rounded-md bg-gray-200"
            />
          </label>

          <label htmlFor="name" className="block">
          <span class="block text-sm font-medium text-slate-700 md:mb-2">
              Email
            </span>
            <input
              disabled
              type="email"
              name="email"
              id="email"
              required
              onChange={handleChange}
              onInvalid={(e) => e.target.setCustomValidity("Email required.")}
              onInput={(e) => e.target.setCustomValidity("")}
              placeholder="Input Email"
              value={email}
              className="cursor-not-allowed disabled:text-slate-500 disabled:shadow-none w-full p-3 outline outline-2 outline-gray-400 focus:outline-black rounded-md bg-gray-200"
            />
          </label>

          <label htmlFor="name" className="block">
          <span class="block text-sm font-medium text-slate-700 md:mb-2">
              Phone Number
            </span>
            <input
              type="number"
              name="phone"
              id="phone"
              onChange={handleChange}
              onInvalid={(e) => e.target.setCustomValidity("Phone required.")}
              onInput={(e) => e.target.setCustomValidity("")}
              placeholder="Input Phone"
              value={phone}
              className="w-full p-3 outline outline-2 outline-gray-400 focus:outline-black rounded-md bg-gray-200"
            />
          </label>
        </div>
        <button
          type="submit"
          className="cursor-progress w-full py-2 rounded-md text-center font-bold bg-blue-600 text-white"
        >
          Save Changes
        </button>
        {message && message}
      </form>
    </div>
  );
}
