import dbConnect from "@/utils/db";
import User from "@/models/UserSchema";
import { getSession } from "@/utils/getSession";
import { NextResponse } from "next/server";

dbConnect();

export async function POST(req){
    try {
        const reqBody = await req.json();
        const { postOwnerId} = reqBody;
        //finding the currentUser
        const session = await getSession(req);
        const currentUser = await User.findOne({email: session.email});
        const currentUserId = currentUser._id.toString();
        //finding the post owner
        const postOwner = await User.findOne({_id: postOwnerId})
        
       if(!postOwner.follows) {
         postOwner.follows = [];
       }
       const hasFollowed = postOwner.follows.some(follow => follow.toString() === currentUserId);
       var followed ;
       if(hasFollowed) {
        await User.updateOne(
            { _id: postOwnerId },
            { $pull: { "follows": currentUserId } }
        );
         followed = false;
       } else {
        await User.updateOne(
            { _id: postOwnerId },
            { $push: { "follows": currentUserId } }
        );
        followed = true;
       }
       

       await postOwner.save();
        return NextResponse.json({message: 'success',followed: followed},{status: 201})

    } catch (error) {
        return NextResponse.json({message: error},{status: 400})
    }
}