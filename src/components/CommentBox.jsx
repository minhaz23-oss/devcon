"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { useSession } from "next-auth/react";
import { MdDelete } from "react-icons/md";
import Alert from "./Alert";
const CommentBox = ({ setShowComment, postId, postOwnerId, commentCount }) => {
  const [comment, setComment] = useState("");
  const [usersComments, setUsersComments] = useState();
  const [currentUserId, setCurrentUserId] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [commentId, setCommentId] = useState("");
  const { data: session } = useSession();

  const handleComment = async () => {
    try {
      const res = await axios.post("/api/comment", {
        postId: postId,
        postOwnerId: postOwnerId,
        comment: comment,
      });

      if (res.status === 201) {
        setShowComment(false);
        commentCount((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getComment = async () => {
      try {
        const res = await axios.post("api/fetchComment", {
          postOwnerId: postOwnerId,
          postId: postId,
        });
        setUsersComments(res.data.comments);
        setCurrentUserId(res.data.currentUserId);
      } catch (error) {
        console.log(error);
      }
    };
    getComment();
  }, []);
 
  return (
    <section className=" z-[9999] w-full h-screen fixed top-0 left-0 backdrop-blur-sm flex justify-center items-center">
      <div className="relative w-[500px] p-3 min-h-[100px] bg-white border-2 border-primary rounded-md flex flex-col  items-center">
        <h1 className=" text-primary text-[25px] font-semibold">Comments</h1>
        {session && (
          <>
            <textarea
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment.."
              className="w-full border border-primary rounded-md text-black p-3 mt-2"
            />
            <button onClick={handleComment} className="btn-primary w-full mt-2">
              submit
            </button>
          </>
        )}
        <div className=" w-full mt-4">
          {usersComments &&
            usersComments.map((val, index) => (
              <div
                key={index}
                className="relative w-full h-fit p-2 mb-1 rounded-md bg-primary/20"
              >
                <div className=" flex items-center gap-3">
                  <img
                    src={val.commenterInfo.commenterImage}
                    alt="pfp"
                    className=" w-12 h-12 rounded-full"
                  />
                  <h1 className=" font-semibold text-[18px]">
                    {val.commenterInfo.commenterName}
                  </h1>
                </div>
                <h1 className="mt-2 font-semibold">{val.comment}</h1>
                {(currentUserId === postOwnerId ||
                  currentUserId === val.commenterInfo.commenterId) && (
                  <MdDelete
                    onClick={() => {
                      // handleCommentDelete(val.id)
                      setCommentId(val.id);
                      setShowAlert(true);
                    }}
                    className=" absolute right-3 bottom-3 text-black text-[25px] cursor-pointer"
                  />
                )}
              </div>
            ))}
        </div>
        <ImCross
          onClick={() => setShowComment(false)}
          className="absolute top-5 right-5 text-primary text-[20px] cursor-pointer"
        />
        {showAlert && (
          <Alert
            setShowAlert={setShowAlert}
            index={{
              commentId: commentId,
              postOwnerId: postOwnerId,
              postId: postId,
            }}
            isCommentApi={true}
            setShowComment={setShowComment}
            commentCount={commentCount}
          />
        )}
      </div>
    </section>
  );
};

export default CommentBox;
