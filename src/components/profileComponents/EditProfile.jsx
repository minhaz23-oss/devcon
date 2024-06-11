"use client";
import { useState,useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import ImageUploader from "../ImageUploader";
import axios from 'axios';
import { useProfileRefresh } from "@/ProfileRefreshContext";
const EditProfile = ({ setCurrentPage }) => {
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [profileInfo,setProfileInfo] = useState({
    imageUrl: '',
    username:'',
    bio: '',  
  })
  const [userData,setUserData] = useState({
    usernameG: '',
    bioG:'',
    imageUrlG:''
  })
  const { setRefresh } = useProfileRefresh();
  useEffect(() => {
    setProfileInfo(prev => ({ ...prev, imageUrl: imgUrl }));
  }, [imgUrl]);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("api/users/getProfileInfo");
        setUserData({...userData,
          usernameG: res.data.user.username,
          bioG: res.data.user.profileInfo && res.data.user.profileInfo.bio,
          imageUrlG: res.data.user.profileInfo && res.data.user.profileInfo.imageUrl
        })
        
      } catch (error) {
        console.log(error)
      }
    }
    getData();
  },[])
  const handleProfile = async () => {
    try {
      const res = await axios.post('api/users/profileInfo',profileInfo);
      if(res.status === 201){
        setCurrentPage('posts');
        setRefresh(prev => !prev);
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <section className=" h-full w-full p-[20px] sm:p-[50px]">
      <div className="w-full flex items-center gap-10">
        <button
          onClick={() => setCurrentPage("posts")}
          className="btn-primary hover:bg-primary/[80%] px-[20px] flex items-center gap-3"
        >
          <IoMdArrowRoundBack className="text-[20px]" />
          Back
        </button>
        <h1 className=" text-primary text-[30px] sm:text-[40px] font-black">Edit Profile</h1>
      </div>
      <div className="w-full h-fit bg-primary rounded-md mt-5 p-3 ">
        <div className="flex items-center gap-3 sm:gap-10">
          <div className="w-24 h-24 bg-white/20 rounded-full">
          
              <img
                src={imgUrl ? imgUrl : (userData.imageUrlG ? userData.imageUrlG : 'demoProfile.jpg')}
                alt="pfp"
                className=" w-full h-full rounded-full"
              />
           
          </div>
          <button
            onClick={() => setShowImageUploader(true)}
            className="hover:scale-105 bg-white px-[5px] sm:px-[30px] py-3 text-primary font-semibold rounded-md sm:text-[18px] text-[16px]"
          >
            Change Profile Picture
          </button>
          {showImageUploader && (
            
            <ImageUploader
            setShowImageUploader={() => setShowImageUploader(false)}
              setImgUrl={setImgUrl}
            />
           
            
          )}
        </div>
        <div className="mt-5 text-white font-semibold flex flex-col gap-4  ">
          <div className=" flex items-center  gap-[10px]">
            <label>Username:</label>
            <input
              type="text"
              placeholder={userData.usernameG}
              className=" w-[200px] sm:w-[250px] p-2 rounded-md bg-white text-primary outline-none border-none placeholder:text-primary font-normal placeholder:text-[14px]"
              onChange={(e) => setProfileInfo({...profileInfo,username:e.target.value})}
            />
          </div>
          
          <div className=" flex items-center  gap-[60px]">
            <label>Bio:</label>
            <textarea
              type="text"
              placeholder={userData.bioG}
              
              className=" w-[200px] sm:w-[250px] p-2 rounded-md bg-white text-primary outline-none border-none placeholder:text-primary font-normal placeholder:text-[14px]"
              onChange={(e) => setProfileInfo({...profileInfo,bio:e.target.value})}
            />
          </div>
          <button onClick={handleProfile} className="bg-white hover:bg-white/80 px-[auto] py-2 rounded-md text-primary font-semibold">
            Save
          </button>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
