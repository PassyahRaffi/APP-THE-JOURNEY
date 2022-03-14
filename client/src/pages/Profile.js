import React, { useState, useEffect, useContext } from "react";
import { API } from "../config/api";
import { Link } from "react-router-dom";
import dateFormat, { masks } from "dateformat";
import ProfileImage from "../assets/profile.jpg";
import { UserContext } from "../context/userContext";
import parse from "html-react-parser";

const Profile = () => {
  const [post, setPost] = useState([]);
  const [user, setUser] = useState([]) /* new */
  const [state, dispatch] = useContext(UserContext);

  const getPostUser = async () => {
    try {
      const response = await API.get(`/postUser/${state.user.id}`);
      setPost(response.data.data.posts);
      setUser(response.data.data.posts.user) /* new */
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostUser([]); /* new */
  }, []);

  return (
    <div>
      <div className="flex items-center justify-center md:mt-16">
        <img
          src={ProfileImage}
          alt=""
          className="w-44 h-44 rounded-full object-cover"
        />
      </div>
      <div className="flex items-center justify-center flex-col md:mt-4">
        <h1 className="text-xl">{state.user.name}</h1> {/* new */}
        <p>{state.user.email}</p>
        <p>{state.user.phone}</p> {/* new */}
      </div>

      <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {post.map((items, index) => (
          <Link key={index} to={`/detail/${items.id}`}>
            <div className="relative rounded overflow-hidden shadow-lg h-full">
              <div>
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
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Profile;
