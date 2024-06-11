import User from "@/models/UserSchema";
import dbConnect from "@/utils/db";
import { getSession } from "@/utils/getSession";
import { NextResponse } from "next/server";

dbConnect();
export async function GET(req){
    try {
        const session = await getSession(req);
        
        const user = await User.findOne({email: session.email});
        
        return NextResponse.json({posts: user.posts, postOwnerId: user._id,imageUrl: user.profileInfo && user.profileInfo.imageUrl, username: user.username},{status: 201}) 
       
    } catch (error) {
       return NextResponse.json({mesaage: 'error while fetching data'},{status: 400}) 
    }
}