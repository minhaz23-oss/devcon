"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import PostCard from "../../../components/PostCard";
const page = ({ params }) => {
  const [userData, setUserData] = useState();
  const [isFollowed, setIsFollowed] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");
  useEffect(() => {
    const getProfileData = async () => {
      try {
        const res = await axios.post("/api/viewProfileInfo", {
          userId: params.id,
        });
        setUserData(res.data.user);
        setCurrentUserId(res.data.currentUserId);
      } catch (error) {
        console.log(error);
      }
    };
    getProfileData();
  }, [isFollowed]);
 
  useEffect(() => {
    const getFollowStatus = async () => {
      try {
        const res = await axios.post("/api/getFollowStatus", { postOwnerId: params.id});
        if (res.data.followed === true) {
          setIsFollowed(true);
          console.log('already followde')
        } else if (res.data.followed === false) {
          setIsFollowed(false);
          console.log('not yet')
        }
      } catch (err) {
        console.log(err);
      }
    };
    getFollowStatus();
  } ,[])
  const handleFollow = async () => {
    try {
      const res = await axios.post("/api/follow", { postOwnerId: params.id });
      if (res.data.followed === true) {
        setIsFollowed(true);
      } else if (res.data.followed === false) {
        setIsFollowed(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <main className=" w-full h-screen ">
      <div className=" min-h-screen w-full px-[20px] sm:px-[100px] pb-10  bg-white   bg-grid-black/[0.2] relative flex justify-center">
        <div className=" w-full flex flex-col items-center pt-10">
          <div className=" h-32 w-32 rounded-full">
            {userData && (
              <img
                src={userData.profileInfo.imageUrl}
                alt="pfp"
                className="w-full h-full rounded-full"
              />
            )}
          </div>
          {userData && (
            <>
              <h1 className=" text-primary font-semibold mt-1">
                {userData.username}
              </h1>
              <h1 className="font-semibold mt-1">
                {userData.follows.length} followers
              </h1>
              <h1 className="mt-1">{userData.profileInfo.bio}</h1>
            </>
          )}

          <div className=" mt-2 flex gap-2">
            {currentUserId && currentUserId !== params.id && (
              <button
                onClick={handleFollow}
                className=" px-5 py-2 bg-primary text-white font-semibold rounded-md"
              >
                {isFollowed ? "Unfollow" : "Follow"}
              </button>
            )}
          </div>
          <section className="mt-10 flex flex-col items-center gap-4 flex-wrap">
            {userData && (
              userData.posts.map((post,index) => (
                <PostCard 
                 key={index}
                 title={post.title}
                 imgUrl={post.imageUrl}
                 profilePic={userData.profileInfo.imageUrl}
                 postOwnerId={userData._id}
                 postId={post.id}
                 username={userData.username}
                 showFollowBtn={true}
                />
              ))
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default page;
