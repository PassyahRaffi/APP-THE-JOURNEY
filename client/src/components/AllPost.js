import React, { useState, useEffect, Fragment, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import dateFormat from "dateformat";
import parse from "html-react-parser";
import Bookmark from "../assets/bookmark.png";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";

import { API } from "../config/api";

const AllPost = () => {
  const [post, setPost] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = useState("");

  const handleClick = async () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <button onClick={handleClose}>close</button>
    </React.Fragment>
  );

  const getPosts = async () => {
    try {
      const response = await API.get("/posts");
      setPost(response.data.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookmark = async (journeyID) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      var id = {
        idJourney: journeyID,
      };

      const body = JSON.stringify(id);
      const response = await API.post("addBookmark", body, config);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <div className="md:mt-10">
        <div className="md:mt-8 md:mb-10">
          <TextField
            className="w-full"
            id="outlined-basic"
            label="Search anything here"
            variant="outlined"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <h2 className="mb-4">All Post</h2>

        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          message="Saved to bookmark."
          action={action}
        />

        <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {post
            .filter((items) => {
              if (search === "") {
                return items;
              } else if (
                items.title.toLowerCase().includes(search.toLowerCase()) ||
                items.description
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                items.user.name.toLowerCase().includes(search.toLowerCase())
              ) {
                return items;
              }
            })
            .map((items) => (
              <div className="relative rounded overflow-hidden shadow-lg h-full">
                <div
                  onClick={() => handleBookmark(items.id)}
                  className="absolute z-10 right-0 cursor-pointer"
                >
                  <img onClick={handleClick} src={Bookmark} alt="" />
                </div>
                <Link to={`/detail/${items.id}`}>
                  <div>
                    <img
                      src={items.thumbnail}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="px-6 pt-4">
                    <h3 className="text-xl mb-1 font-bold line-clamp-1">
                      {items.title}
                    </h3>
                  </div>
                  <div className="px-6">
                    <p className="text-gray-500 line-clamp-1">
                      {dateFormat(items.createdAt, "mediumDate")},{" "}
                      {items.user.name}
                    </p>
                  </div>
                  <div className="px-6 md:my-6">
                    <p className="line-clamp-3">{parse(items.description)}</p>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default AllPost;