"use client";
import { useEffect, useState } from "react";
import { RiImageAddLine } from "react-icons/ri";
import ImageUploader from "../ImageUploader";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const CreatePosts = ({setCurrentPage}) => {
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [postInfo,setPostInfo] = useState({
    title: '',
    imageUrl: '',
    tags: ''
  })
  useEffect(() => {
    console.log('showImageUploader after update:', showImageUploader);
  }, [showImageUploader]);
  useEffect(() => {
    setPostInfo(prev => ({ ...prev, imageUrl: imgUrl }));
  },[imgUrl])
  const handlePost = async () => {
    try {
      if (!postInfo.title && !postInfo.imageUrl) {
        toast.error("please fill up Title or Image", {
          style: {
            backgroundColor: "#111",
            color: "#fff",
          },
        });
        return;
      }
      const res = await axios.post('/api/users/postInfo',postInfo);
      if(res.status === 201){
        setCurrentPage('posts')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <section className=" h-full w-full flex justify-center items-center p-[20px] sm:p-[50px]">
      <Toaster/>
      <div className="w-full p-4 bg-primary flex flex-col items-center rounded-md">
        <h1 className=" text-white text-center text-[30px] sm:text-[40px] font-black">
          Create Post
        </h1>
        <textarea
          type="text"
          placeholder="Write your title..."
          className="w-full p-3 border-none outline-none rounded-md text-primary placeholder:text-primary"
          onChange={(e) => setPostInfo({...postInfo,title: e.target.value})}
        />
        <div
          onClick={() => setShowImageUploader(true)}
          className="w-full h-[250px] flex gap-2 justify-center items-center rounded-md bg-white hover:bg-white/80 cursor-pointer mt-3"
        >
          {imgUrl ? (
            <img src={imgUrl && imgUrl} alt="postImg" className=" w-[400px] h-[95%] rounded-md" />
          ) : (
          <>
          <RiImageAddLine className="text-primary text-[50px]" />
          <h1 className=" text-primary font-semibold">Add your image</h1>
          </>
          )}
        </div>
          {showImageUploader && (
        
            <ImageUploader
            setShowImageUploader={setShowImageUploader}
              setImgUrl={setImgUrl}
            />
        
          )}
        <input
          type="text"
          placeholder="Add tags (#react, #nextjs)"
          className="bg-white text-primary w-full placeholder:text-primary rounded-md outline-none border-none mt-3 p-2"
          onChange={(e) => setPostInfo({...postInfo,tags: e.target.value})}
        />
        <button onClick={handlePost} className="w-full bg-white hover:bg-white/80 text-primary font-semibold rounded-md py-2 mt-3">
          post
        </button>
      </div>
    </section>
  );
};

export default CreatePosts;

