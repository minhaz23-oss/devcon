import dbConnect from "@/utils/db";
import User from "@/models/UserSchema";
import { NextResponse } from "next/server";
import { getSession } from "@/utils/getSession";
dbConnect();

export async function POST(req){
    try {
        const reqBody = await req.json();
        const { postOwnerId} = reqBody;
        const session = await getSession(req);
        const currentUser = await User.findOne({email: session.email})
        const currentUserId = currentUser._id.toString();
        //finding the post owner
        const postOwner = await User.findOne({_id: postOwnerId})
        var followed;
        
       if(postOwner.follows){

           const hasFollowed = postOwner.follows.includes(currentUserId)
           console.log(hasFollowed)
           var followed ;
           if(hasFollowed) {
           
             followed = true;
           } else {
           
            followed = false;
           }
           
       }

       await postOwner.save();
        return NextResponse.json({message: 'success',followed: followed},{status: 201})

    } catch (error) {
        return NextResponse.json({message: error},{status: 400})
    }
}