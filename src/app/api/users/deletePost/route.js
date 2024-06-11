import User from "@/models/UserSchema";
import dbConnect from "@/utils/db";
import { getSession } from "@/utils/getSession";
import { NextResponse } from "next/server";

dbConnect();
export async function POST(req) {
    try {
        //getting reqBody
        const reqBody = await req.json();
        const {postId} = reqBody;
        
        //getting the session
        const session = await getSession(req);
      
        //finding the user
        const user = await User.findOne({email: session.email});
        const updatedComment = await User.updateOne(
            { _id: user._id, "posts.id": postId },
            { $pull: { posts: { id: postId } } }
          
        );
        return NextResponse.json({message: 'success'},{status: 201})
    } catch (error) {
        return NextResponse.json({message: error},{status: 400})
    }
}