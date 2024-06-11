import dbConnect from "@/utils/db";
import User from "@/models/UserSchema";
import { NextResponse } from "next/server";
import { getSession } from "@/utils/getSession";
dbConnect();

export async function POST(req) {
    try {
         const reqBody = await req.json();
         const {userId} = reqBody;
         const session = await getSession(req);
         const currentUser = await User.findOne({email: session.email});
         const currentUserId = currentUser._id.toString();
         const user = await User.findOne({_id: userId});
      
        return NextResponse.json({message: 'success',user: user,currentUserId: currentUserId},{status: 201})
    } catch (error) {
        return NextResponse.json({message: error},{status: 400})
    }
}