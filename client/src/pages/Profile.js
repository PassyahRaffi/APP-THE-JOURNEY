import React, { useState, useEffect, useContext } from "react";
import { API } from "../config/api";
import { Link } from "react-router-dom";
import dateFormat, { masks } from "dateformat";
import ProfileImage from "../assets/profile.jpg";
import { UserContext } from "../context/userContext";
import parse from "html-react-parser";

const Profile = () => {
  const [post, setPost] = useState([]);
  const [state, dispatch] = useContext(UserContext);

  const getPosts = async () => {
    try {
      const response = await API.get(`/postUser/${state.user.id}`);
      setPost(response.data.data.posts);
      console.log(state);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-center md:mt-16">
        <img src={ProfileImage} alt="" className="w-44 h-44 rounded-full object-cover" />
      </div>
      <div className="flex items-center justify-center flex-col md:mt-4">
        <h1 className="text-xl">{state.name}</h1>
        <p>{state.user.email}</p>
      </div>

      <div>
        <div className="bg-white">
          <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="mb-4">My Post</h2>

            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {post.map((items, index) => (
                <Link key={index} to={`/detail/${items.id}`}>
                  <div className="card md:w-72 rounded md:p-4">
                    <div>
                      <img
                        src={items.thumbnail}
                        alt=""
                        className="h-44 w-full object-cover"
                      />
                    </div>
                    <div className="md:mt-4">
                      <h3 className="text-xl">{items.title}</h3>
                    </div>
                    <div className="">
                      <p className="text-gray-500">
                        {dateFormat(items.createdAt, "mediumDate")},{" "}
                        {items.user.name}
                      </p>
                    </div>
                    <div className="md:my-4">
                      <p className="line-clamp-3">{parse(items.description)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
