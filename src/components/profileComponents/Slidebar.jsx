"use client";
import { FaLaptopCode } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { IoIosCreate } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import Logo from "@/components/Logo";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useProfileRefresh } from "@/ProfileRefreshContext";
const Slidebar = ({ setCurrentPage }) => {
  const { data: session } = useSession();
  const { refresh } = useProfileRefresh();
  const [followers,setFollowers] = useState('');
  
  const [userData, setUserData] = useState({
    username: "",
    imageUrl: "",
    bio: ''
  });
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("api/users/getProfileInfo");
        setUserData({
          ...userData,
          username: res.data.user.username,
          imageUrl: res.data.user.profileInfo && res.data.user.profileInfo.imageUrl,
          bio: res.data.user.profileInfo && res.data.user.profileInfo.bio
        });
        setFollowers(res.data.followers)
      } catch (error) {
        console.log(error);
      }
    };
    
    getData();
  }, [refresh]);
  return (
    <div className="w-full flex sm:block justify-between items-center sm:w-[250px] bottom-0 sm:left-0 z-50 fixed h-[60px] sm:h-screen bg-white border-t-2 sm:border-r-2 border-primary p-4">

      <div className=" hidden sm:block">

       <Logo />
     
      </div>
      {session && (
        <div className="hidden sm:block">
          <div className="  flex justify-center items-center overflow-hidden w-24 h-24 mt-3 bg-primary/50 rounded-full">
            <img
              className="w-full h-full rounded-full object-cover"
              src={
                userData.imageUrl
                  ? userData.imageUrl
                  : session.user.image
                  ? session.user.image
                  : "/demoProfile.jpg"
              }
              alt="profile_pic"
            />
          </div>
          <h1 className="mt-2 font-semibold">{followers && followers} followers</h1>
          <h1 className=" text-primary text-[18px] font-semibold">
            @
            {userData.username
              ? userData.username
              : session.user.name &&
                session.user.name.replace(/\s+/g, "").toLowerCase()}
          </h1>
          <p className='text-black font-semibold'>{userData.bio}</p>
        </div>
      )}
     

      <Link href='/'
       
        className="sm:w-full h-fit px-2 rounded-md sm:mt-5 hover:bg-primary/50 py-2 cursor-pointer  flex flex-col sm:flex-row items-center sm:gap-2  "
      >
        <FaHome className=" text-primary text-[25px] sm:text-[20px]" />
        <h1 className=" hidden sm:block text-primary text-[18px] font-semibold">Home</h1>
      </Link>
      
      <div
        onClick={() => setCurrentPage("posts")}
        className=" sm:w-full h-fit flex flex-col sm:flex-row items-center sm:gap-2  hover:bg-primary/50 py-2 cursor-pointer px-2 rounded-md"
      >
        <FaLaptopCode className=" text-primary text-[25px] sm:text-[20px]" />
        <h1 className="hidden sm:block text-primary text-[18px] font-semibold">Posts</h1>
      </div>
      <div
        onClick={() => setCurrentPage("editProfile")}
        className=" sm:w-full h-fit flex flex-col sm:flex-row items-center sm:gap-2 hover:bg-primary/50 py-2 cursor-pointer px-2 rounded-md"
      >
        <FaUserEdit className=" text-primary text-[25px] sm:text-[20px]" />
        <h1 className=" hidden sm:block text-primary text-[18px] font-semibold">
          Edit Profile
        </h1>
      </div>
      <div
        onClick={() => setCurrentPage("createPost")}
        className=" sm:w-full h-fit flex flex-col sm:flex-row items-center sm:gap-2 hover:bg-primary/50 py-2 cursor-pointer px-2 rounded-md"
      >
        <IoIosCreate className=" text-primary text-[25px] sm:text-[20px]" />
        <h1 className=" hidden sm:block text-primary text-[18px] font-semibold">Create Post</h1>
      </div>
      <div onClick={() => signOut({
        callbackUrl: '/'
      })} className=" sm:w-full h-fit flex flex-col sm:flex-row items-center sm:gap-2 hover:bg-primary/50 py-2 cursor-pointer px-2 rounded-md">
        <IoIosLogOut className=" text-primary text-[25px] sm:text-[20px]" />
        <h1 className=" hidden sm:block text-primary text-[18px] font-semibold">Logout</h1>
      </div>
    </div>
  );
};

export default Slidebar;
