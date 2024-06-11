"use client";
import { useState } from "react";
import { FaCode } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BackgroundGradientAnimation } from "@/components/ui/BgGradient";
import Link from "next/link";
import Loader from "@/components/Loader";
import { signIn } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

const page = () => {

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleSignup = async () => {
    const {username,email,password} = user;
    if(!username || !email || !password) {
      toast.error('Please fill up all the fields !!',{
        style:{

          backgroundColor: '#111',
          color: '#fff'
        }
      })
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post("api/users/signup", user);
      
      if(res.status === 200) {
        toast.error('user already exists',{
          style:{

            backgroundColor: '#111',
            color: '#fff'
          }
        })
        
      }
      
      if (res.status === 201) {
        localStorage.setItem("signupSuccess", "true");
     
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex justify-center items-center w-full h-screen relative bg-white bg-grid-black/[0.2] ">
      <Toaster />
      <div className=" flex w-[300px] sm:w-[800px] bg-primary rounded-[10px]">
        <div className=" w-[300px] sm:w-[400px] text-primary font-semibold min-h-[200px] border-2 border-primary bg-white rounded-l-[10px] p-3">
          <h1 className=" mb-2 text-center text-primary text-[25px] font-semibold">
            Signup
          </h1>
          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            className="bg-black/10 border-none text-black p-2 rounded-md w-full mt-1 mb-1"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <label>Email</label>
          <input
            type="text"
            placeholder="Email"
            className="bg-black/10 border-none text-black p-2 rounded-md w-full mt-1 mb-1"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            className="bg-black/10 text-black border-none p-2 rounded-md w-full mt-1 mb-1"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <button
            onClick={handleSignup}
            className=" btn-primary mb-1  w-full mt-2"
          >
            Signup
          </button>
          <button
            onClick={() =>
              signIn("github", {
                callbackUrl: '/onboarding'
              })
            }
            className=" btn-secondary mb-2  w-full "
          >
            Signup with GitHub
          </button>
          <Link href="/login">
            Already have an account? <span className=" underline">Login</span>
          </Link>
        </div>
        <div className="w-[400px] hidden sm:flex flex-col justify-center items-center overflow-hidden rounded-[10px]">
          <BackgroundGradientAnimation
            children={
              loading ? (
                <div className=" w-full flex justify-center">
                  <Loader color={'white'}/>
                </div>
            ) : (
                <div className=" w-full min-h-[200px] flex flex-col justify-center items-center ">
                  <div className=" flex items-center gap-1">
                    <h1 className=" text-[30px] font-bold text-white">
                      DevCon
                    </h1>
                    <FaCode className="  text-white text-[25px] rounded-sm" />
                  </div>
                  <p className=" text-white font-semibold text-[18px]">
                    Where developers connect!!
                  </p>
                </div>
              )
            }
            gradientBackgroundStart="rgb(206, 14, 46)"
            gradientBackgroundEnd="rgb(212, 61, 61)"
            firstColor="255,255,255"
            secondColor="137, 126, 189"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
