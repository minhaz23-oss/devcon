"use client";

import { useEffect, useState } from "react";

import axios from "axios";
import Alert from "../Alert";
import PostCard from "../PostCard";

const Posts = ({ setCurrentPage }) => {
  const [postData, setPostData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [postId, setPostId] = useState();
  const [postOwnerId, setPostOwnerId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [username, setUsername] = useState("");

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/users/getPostInfo");
      setPostData(res.data.posts);
      setPostOwnerId(res.data.postOwnerId);
      setImageUrl(res.data.imageUrl);
      setUsername(res.data.username);
      if (res.status === 201) {
        console.log("success");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleShowAlert = (postId) => {
    setPostId(postId);
   
    setShowAlert(true);
  };
  return (
    <section className="relative min-h-full w-full px-[10px] sm:px-[50px] py-[20px] sm:py-[50px]">
      <div className=" w-full  flex gap-[20px] sm:gap-[60px] items-center">
        <h1 className=" w-[50%] text-primary text-[25px] sm:text-[40px] font-black">My Posts</h1>
        <button
          onClick={() => setCurrentPage("createPost")}
          className=" w-[50%] btn-primary  sm:w-[200px] px-4 sm:px-[40px] text-[16px] sm:text-[18px] "
        >
          Create Post
        </button>
      </div>
      <div className=" flex items-start gap-4 flex-wrap mt-4">
        {postData &&
          postData.map((val, index) => (
            <>
            <PostCard
              key={index}
              title={val.title}
              imgUrl={val.imageUrl}
              setShowAlert={() => handleShowAlert(val.id)}
              postOwnerId={postOwnerId}
              postId={val.id}
              profilePic={imageUrl}
              username={username}
            />
      {showAlert && (
        <Alert
          isCommentApi={false}
          setShowAlert={setShowAlert}
          index={index}
          fetchData={fetchData}
          postId={postId}
        />
      )}
            </>
          ))}
      </div>
    </section>
  );
};

export default Posts;
