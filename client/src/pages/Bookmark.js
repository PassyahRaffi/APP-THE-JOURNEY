import React, { useState, useContext, useEffect, Fragment } from "react";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import { Link } from "react-router-dom";
import dateFormat, { masks } from "dateformat";
import parse from "html-react-parser";
import BookmarkImage from "../assets/bookmarked.png";
import Snackbar from "@mui/material/Snackbar";

const Bookmark = () => {
  const [post, setPost] = useState([]);
  const [state] = useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = useState([]);

  const path = "http://localhost:5000/uploads/";

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

  const handleBookmark = async (id) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      var id = {
        id: id,
      };

      const body = JSON.stringify(id);
      await API.post("deleteBookmark", body, config);
    } catch (error) {
      console.log(error);
    }
  };

  const getBookmark = async () => {
    try {
      const response = await API.get(`/getBookmark/${state.user.id}`);
      setPost(response.data.bookmarkData);
      setUser(response.data.dataBookmark);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBookmark();
  }, [post]);

  return (
    <div className="md:w-9/12 md:m-auto">
      <div className="md:mt-10">
        <h1 className="text-3xl mb-8 font-bold">My Bookmark</h1>
      </div>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Bookmark delete success."
        action={action}
      />

      <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {post.map((items, index) => (
          <div className="relative rounded overflow-hidden shadow-lg h-full">
            <div
              onClick={() => handleBookmark(items.id)}
              className="absolute z-10 right-0 cursor-pointer"
            >
              <img onClick={handleClick} src={BookmarkImage} alt="" />
            </div>
            <Link key={index} to={`/detail/${items.idPost}`}>
              <div>
                <div>
                  <img
                    src={path + items.bookmark.thumbnail}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="px-6 pt-4">
                  <h3 className="text-xl mb-1 font-bold line-clamp-1">{items.bookmark.title}</h3>
                </div>
                <div className="px-6">
                  <p className="text-gray-500 line-clamp-1">
                    {dateFormat(items.createdAt, "mediumDate")}, {""}
                    {items.bookmark.user.name}
                  </p>
                </div>
                <div className="px-6 md:my-6">
                  <p className="line-clamp-3">
                    {parse(items.bookmark.description)}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookmark;
