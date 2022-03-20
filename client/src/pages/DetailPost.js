import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dateFormat from "dateformat";
import DOMPurify from "dompurify";

import { API } from "../config/api";

const DetailPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [user, setUser] = useState([]);

  const getPost = async () => {
    const response = await API.get("/detail/" + id);
    // console.log(response);
    setPost(response.data.detail);
    setUser(response.data.detail.user);
  };

  var clean = DOMPurify.sanitize(post.description);

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div>
      <div className="md:w-9/12 md:m-auto md:mt-10">
        <div className="flex justify-between items-center md:my-10">
          <div>
            <h1 className="text-5xl">{post.title}</h1>
            <p className="text-lg mt-4">
              {dateFormat(post.createdAt, "mediumDate")}
            </p>
          </div>
          <div>
            <p className="text-md">{user.name}</p>
          </div>
        </div>

        <div>
          <img
            src={post.thumbnail}
            alt=""
            className="heightDetail w-full object-cover"
          />
        </div>

        <div className="mt-20 pb-10" dangerouslySetInnerHTML={{ __html: clean }}>
        </div>
      </div>
    </div>
  );
};

export default DetailPost;
