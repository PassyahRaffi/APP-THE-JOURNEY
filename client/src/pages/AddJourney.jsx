import React, { useState, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { API } from "../config/api";

const AddJourney = () => {
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    thumbnail: "",
  });

  const { title, description, thumbnail } = form;
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  const handleChangeEditor = (event, editor) => {
    const data = editor.getData();
    setForm({
      ...form,
      description: data,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("description", form.description);
      formData.set("thumbnail", form.thumbnail[0], form.thumbnail[0].name);

      const response = await API.post("/addPost", formData, config);
      console.log(response);

      if (response.data.status === "Success") {
        const alert = (
          <div
            className="bg-green-400 rounded-md text-center text-sm px-4 py-3 mt-4 font-bold"
            role="alert"
          >
            <p>New Journey Success Added!</p>
          </div>
        );
        setMessage(alert);
        setTimeout(() => {
          setMessage(null);
        }, 4000);
        setForm({
          title: "",
          description: "",
          thumbnail: "",
        });
      } else {
        const alert = (
          <div
            className="bg-red-500 text-white rounded-md text-center text-sm px-4 py-3 mt-4 font-bold"
            role="alert"
          >
            <p>Error. Try Again!</p>
          </div>
        );
        setMessage(alert);
        setTimeout(() => {
          setMessage(null);
        }, 4000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="md:flex md:flex-col w-full md:mt-6">
      <div className="md:w-9/12 md:m-auto">
        <div>
          <h1 className="text-5xl font-bold">New Journey</h1>
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="title"
              className="flex flex-col md:mt-5 text-2xl md:mb-8"
            >
              Title Journey
              <input
                type="text"
                name="title"
                onChange={handleChange}
                value={title}
                required
                className="border-2 py-1 px-3 mt-2"
              />
            </label>

            <CKEditor editor={ClassicEditor} onChange={handleChangeEditor} />

            <label htmlFor="thumbnail" className="flex flex-col mt-4">
              Upload Thumbnail
              <input
                type="file"
                name="thumbnail"
                onChange={handleChange}
                className="md:mt-1"
              />
            </label>

            <button
              type="submit"
              className="w-full mt-4 py-2 rounded-md bg-blue-600 text-white font-bold"
            >
              Submit
            </button>
            {message && message}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddJourney;
