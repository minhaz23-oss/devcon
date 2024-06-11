'use client'
import { ProfileRefreshProvider } from "@/ProfileRefreshContext";
import CreatePosts from "@/components/profileComponents/CreatePosts";
import EditProfile from "@/components/profileComponents/EditProfile";
import Posts from "@/components/profileComponents/Posts";
import Slidebar from "@/components/profileComponents/Slidebar";
import { useState,useEffect } from "react";

import toast, { Toaster } from "react-hot-toast";
const page = () => {
  const [currentPage,setCurrentPage] = useState('posts');
  
  useEffect(() => {
    const loginSuccess = localStorage.getItem("loginSuccess");
    if (loginSuccess) {
      toast.success("Successfully logged in!", {
        style: {
          backgroundColor: "#111",
          color: "#fff",
        },
      });
      localStorage.removeItem("loginSuccess");
    }
  }, []);
  return (
    <ProfileRefreshProvider>
    <div className=" w-full min-h-screen bg-white bg-grid-black/[0.2]">
    <Toaster />
      <div className="w-full min-h-screen flex relative">
         <Slidebar   setCurrentPage={setCurrentPage} />
         <div className="flex-1 min-h-screen ml-0 sm:ml-[250px]">
           {currentPage === 'posts' && <Posts setCurrentPage={setCurrentPage}/>}
           {currentPage === 'editProfile' && <EditProfile  setCurrentPage={setCurrentPage}/>}
           {currentPage === 'createPost' && <CreatePosts setCurrentPage={setCurrentPage}/>}
         </div>
      </div>
    </div>
    </ProfileRefreshProvider>
  )
}

export default page
