import { getSession } from "@/utils/getSession";
import dbConnect from "@/utils/db";
import User from "@/models/UserSchema";
import { NextResponse } from "next/server";

dbConnect();

export async function POST(req) {
    try {
        //finding post owner 
        const reqBody = await req.json();
        const {id,postId} = reqBody;
        const postOwner = await User.findOne({_id : id});
        // finding the currentUser
        const session = await getSession(req);
        const currentUser = await User.findOne({email: session.email})
        const currentUserId = currentUser._id.toString();
      
        //finding the post
        const post = postOwner.posts.find(post => post.id === postId);
        if (!post) {
            return NextResponse.json({ message: 'Post not found' }, { status: 404 });
        }

        // checking if already liked
        const hasLiked = post.likes.some(like => like.toString() === currentUserId);
        
        if(hasLiked){
            const updatedPost = await User.updateOne(
                { _id: id, "posts.id": postId },
                { $pull: { "posts.$.likes": currentUserId } }
            );
           
            return NextResponse.json({message: 'unliked' },{status: 200})
        } else {
            const updatedPost = await User.updateOne(
                { _id: id, "posts.id": postId },
                { $push: { "posts.$.likes": currentUserId } }
              );
              
              return NextResponse.json({message: 'liked' },{status: 200})
        }
       
        
       
    } catch (error) {
        return NextResponse.json({message: error },{status: 400})
    }
}