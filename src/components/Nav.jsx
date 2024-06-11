'use client'
import Link from "next/link";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Logo from "./Logo";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
const Nav = () => {
  const { data: session } = useSession();
  const [imgUrl,setImgUrl] = useState('');
  const router = useRouter();
  useEffect(() => {
    if(session) {

      const getImage = async () => {
        try {
          const res = await axios.get('/api/users/getProfileInfo');
          setImgUrl(res.data.user.profileInfo.imageUrl)
        } catch (error) {
          console.log(error)
        }
      }
      getImage();
    }
  },[session])
  return (
    <nav className="  relative px-[10px]  z-10 w-full h-[80px] flex justify-center items-center">
      <div className="hover:scale-[1.03] duration-300 flex w-full bg-white border-2 border-primary rounded-[25px] justify-between items-center px-5 py-2">
        <Logo />
        {session ? (
          <div className='flex gap-3'>
          <button onClick={() => signOut()} className="px-4 py-1 bg-primary text-white font-semibold rounded-[8px]">logout</button>
          <div onClick={() => router.push('/profile')} className=" cursor-pointer w-8 h-8 rounded-full bg-black">
            <img src={imgUrl ? imgUrl : '/demoProfile.jpg'} alt="pfp" className="w-full h-full rounded-full" />
          </div>
          </div>
        ) : (
          <div className=" flex gap-1 sm:gap-5">
            <Link
              href="/signup"
              className=" px-4 py-1 bg-primary text-white font-semibold rounded-[8px]"
            >
              Signup
            </Link>
            <Link
              href="/login"
              className=" px-4 py-1 border border-primary text-primary font-semibold rounded-[8px]"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
