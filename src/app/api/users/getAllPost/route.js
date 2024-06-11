import User from "@/models/UserSchema";
import dbConnect from "@/utils/db";
import { NextResponse } from "next/server";


dbConnect();
export async function GET(req) {
    try {
       
      

   

        const users = await User.find({}, 'posts _id profileInfo username')
        
          
        
        const allPost = users.map((user) => ({
            posts: user.posts,
            id: user._id,
            profilePic: user.profileInfo ? user.profileInfo.imageUrl : null,
            username: user.username
        }))
     
        return NextResponse.json(allPost,{status: 201})

    } catch (error) {
        return NextResponse.json({message: 'eror while fetching data'},{status: 400})
    }
}