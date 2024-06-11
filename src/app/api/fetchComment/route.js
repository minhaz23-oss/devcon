import dbConnect from "@/utils/db";
import User from "@/models/UserSchema";
import { NextResponse } from "next/server";
import { getSession } from "@/utils/getSession";

dbConnect();
export async function POST(req) {
  try {
    const reqBody = await req.json();
    const {postOwnerId,postId} =  reqBody;
    const session = await getSession(req);
    var currentUserId;
    if(session){
      const currentUser = await User.findOne({email: session.email});
       currentUserId = currentUser._id.toString();
    }
    const postOwner = await User.findOne({_id: postOwnerId});
    const post = postOwner.posts.find(post => post.id === postId);
    const comments = post.comments
    return NextResponse.json({message: 'success',comments: comments,currentUserId:currentUserId},{status: 201})

  } catch (error) {
    return NextResponse.json({message: error},{status: 400})
  }
}