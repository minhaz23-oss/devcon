import dbConnect from "@/utils/db";
import User from "@/models/UserSchema";
import { NextResponse } from "next/server";


dbConnect();

export async function POST(req){
    try { 
        const reqBody = await req.json();
        const {data} = reqBody;
        const {postOwnerId,commentId,postId} = data;
        const updatedComment = await User.updateOne(
            { _id: postOwnerId, "posts.id": postId },
            { $pull: { "posts.$.comments": {id: commentId} } }
        );


        return NextResponse.json({message: 'success'},{status: 201})

    } catch (error) {
        return NextResponse.json({message: error},{status: 400})
    }
}