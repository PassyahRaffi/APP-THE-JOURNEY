import React from "react";
import AllPost from "../components/AllPost";

const Post = () => {
  return (
    <div className=" md:mt-16 md:w-9/12 md:m-auto">
      <div>
        <h1 className="text-4xl font-bold">Journey</h1>
      </div>

      <div>
        <AllPost />
      </div>
    </div>
  );
};

export default Post;
