import React, { useState, useEffect, useContext } from "react";
import { API } from "../config/api";
import { Link } from "react-router-dom";
import dateFormat, { masks } from "dateformat";
import ProfileImage from "../assets/profile.jpg";
import { UserContext } from "../context/userContext";
import parse from "html-react-parser";

const Profile = () => {
  const [post, setPost] = useState([]);
  const [user, setUser] = useState([]); /* new */
  const [state, dispatch] = useContext(UserContext);
  console.log(state);

  const getPostUser = async () => {
    try {
      const response = await API.get(`/postUser/${state.user.id}`);
      setPost(response.data.data.posts);
      setUser(response.data.data.posts.user); /* new */
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostUser([]); /* new */
  }, []);

  return (
    <div>
      <Link to="/editProfile">
        <div className="flex items-center justify-center md:mt-16">
          <span
            className="absolute object-right-top"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Edit Profile"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="px"
              y="0px"
              width="30"
              height="30"
              viewBox="0 -3 30 30"
            >
              {" "}
              <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"></path>
            </svg>
          </span>
          <img
            src={ProfileImage} /* new pending */
            alt=""
            className="w-44 h-44 rounded-full object-cover hover:bg-gray-600"
          />
          {/* <img
              src={uploads + state.user.profile.image}
              alt=""
              className="hover:brightness-75"
            /> */}
        </div>
      </Link>

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
