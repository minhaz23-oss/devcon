"use client";

import axios from "axios";
import { useEffect, useState,useRef} from "react";
import PostCard from "./PostCard";
import Loader from "./Loader";

const DisplayPost = () => {
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(false);
 
 
 useEffect(() => {
  const fetchPosts = async  () => {
  
    
    try {
      setLoading(true);
      const res = await axios.get(`/api/users/getAllPost`);
       setPostData( res.data)
       
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      
    }
  };
   fetchPosts()
 },[ ]);

  

  return (
    <section className="mt-10 px-[10px] flex flex-col items-center gap-4 flex-wrap">
      {loading ? (
        <Loader color={"primary"} />
      ) : (
        <>
          {postData.length>0 &&
            postData.map((val,userIndex) =>
              val.posts.map((post, postIndex) => (
                <PostCard
                key={`${userIndex}-${postIndex}`} 
                  profilePic={val.profilePic}
                  postOwnerId={val.id}
                  postId={post.id}
                  title={post.title}
                  imgUrl={post.imageUrl}
                  username={val.username}
                  viewProfileLink={val.id}
                />
              ))
            )}
         
        </>
      )}
 


    </section>
  );
};

export default DisplayPost;
