import dbConnect from "@/utils/db";
import User from "@/models/UserSchema";
import { getSession } from "@/utils/getSession";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
dbConnect();

export async function POST(req) {
    try {
        const reqBody = await req.json();
        const {postId,postOwnerId,comment} = reqBody;
   
       
        
        //finding the current user
        const session = await getSession(req);
        const currentUser = await User.findOne({email: session.email});
        
        const currentUserPfp = currentUser.profileInfo.imageUrl;
        const currentUserUsername = currentUser.username;
        const currentUserId = currentUser._id.toString();
        const commentId = uuidv4();
        
        const updatedPost = await User.updateOne(
            { _id: postOwnerId, "posts.id": postId },
            { $push: { "posts.$.comments": {
                commenterInfo: {
                   commenterName: currentUserUsername,
                   commenterImage: currentUserPfp,
                   commenterId: currentUserId
                },
                comment: comment,
                id: commentId
            } } }
        );
        return NextResponse.json({message: 'success',currentUserId: currentUserId},{status: 201})

    } catch (error) {
        return NextResponse.json({message: error},{status: 400})
    }
}