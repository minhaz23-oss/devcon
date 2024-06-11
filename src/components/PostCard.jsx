"use client";
import { FaRegHeart } from "react-icons/fa";
import { BsSuitHeartFill } from "react-icons/bs";
import { BiComment } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useEffect, useState } from "react";
import CommentBox from "./CommentBox";
import Link from "next/link";
const PostCard = ({
  title,
  imgUrl,
  setShowAlert,
  profilePic,
  postOwnerId,
  postId,
  username,
  viewProfileLink,
  showFollowBtn,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [like, setLike] = useState("");
  const [comment, setComment] = useState("");
  const [showComment, setShowComment] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");
  useEffect(() => {
    const getLike = async () => {
      try {
        console.log(postId, postOwnerId);

        const res = await axios.post("/api/getLikeStatus", {
          id: postOwnerId,
          postId: postId,
        });

        setIsLiked(res.data.isLiked);
        setLike(res.data.likeCount);
        setComment(res.data.commentCount);
        setCurrentUserId(res.data.currentUserId);
      } catch (error) {
        console.log(error);
      }
    };
    getLike();
  }, []);
  useEffect(() => {
    const getFollowStatus = async () => {
      try {
        const res = await axios.post("/api/getFollowStatus", {
          postOwnerId: postOwnerId,
        });
        if (res.data.followed === true) {
          setIsFollowed(true);
          console.log("already followde");
        } else if (res.data.followed === false) {
          setIsFollowed(false);
          console.log("not yet");
        }
      } catch (err) {
        console.log(err);
      }
    };
    getFollowStatus();
  }, []);
  const handleFollow = async () => {
    try {
      const res = await axios.post("/api/follow", { postOwnerId: postOwnerId });
      if (res.data.followed === true) {
        setIsFollowed(true);
      } else if (res.data.followed === false) {
        setIsFollowed(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleLike = async () => {
    try {
      const res = await axios.post("/api/like", {
        id: postOwnerId,
        postId: postId,
      });
      if (res.data.message === "unliked") {
        setIsLiked(false);
        setLike((prev) => prev - 1);
      } else if (res.data.message === "liked") {
        setIsLiked(true);
        setLike((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative w-full sm:w-[600px] min-h-[100px] bg-white border border-primary rounded-md p-2">
      {username && (
        <div className=" flex items-center justify-between w-full h-fit p-2 rounded-md bg-primary ">
          <div className=" flex gap-3 items-center">
            {viewProfileLink ? (
              <Link href={`/viewProfile/${viewProfileLink}`}>
                <img
                  src={profilePic ? profilePic : "/demoProfile.jpg"}
                  alt="pfp"
                  className=" w-12 h-12 rounded-full"
                />
              </Link>
            ) : (
              <img
              src={profilePic ? profilePic : "/demoProfile.jpg"}
                alt="pfp"
                className=" w-12 h-12 rounded-full"
              />
            )}

            <h1 className="text-white font-semibold ">{username}</h1>
          </div>
          {showFollowBtn
            ? ""
            : currentUserId &&
              currentUserId !== postOwnerId && (
                <button
                  onClick={handleFollow}
                  className="hover:bg-white/80 px-5 py-2 bg-white text-black font-semibold rounded-md"
                >
                  {isFollowed ? "Unfollow" : "Follow"}
                </button>
              )}
        </div>
      )}
      {title && (
        <div className="w-full py-2">
          <h1 className="text-black font-semibold text-[18px]">{title}</h1>
        </div>
      )}
      {imgUrl && (
        <div className="mt-2 w-full h-[300px] flex justify-center border border-primary bg-white rounded-md overflow-hidden">
          <img src={imgUrl} alt="postImg" />
        </div>
      )}
      <div className=" py-4 px-2 bg-primary cursor-pointer rounded-md w-full flex flex-col gap-1 text-white text-[25px] mt-4 mb-2">
        <div className="flex gap-3">
          {isLiked ? (
            <BsSuitHeartFill onClick={handleLike} />
          ) : (
            <FaRegHeart onClick={handleLike} />
          )}
          <BiComment onClick={() => setShowComment(true)} />
          <RiShareForwardLine />
        </div>
        <div className="text-white font-semibold text-[18px]">
          {like && like} likes | {comment && comment} comments
        </div>
      </div>
      {setShowAlert && (
        <MdDelete
          onClick={() => {
            setShowAlert(true);
          }}
          className="absolute text-white text-[25px] right-5 bottom-10 cursor-pointer"
        />
      )}
      {showComment && (
        <CommentBox
          commentCount={setComment}
          postId={postId}
          postOwnerId={postOwnerId}
          setShowComment={setShowComment}
        />
      )}
    </div>
  );
};

export default PostCard;
