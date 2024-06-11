import User from "@/models/UserSchema";
import dbConnect from "@/utils/db";
import { NextResponse } from "next/server";
import { getSession } from "@/utils/getSession";
dbConnect();
export async function POST(req){
    try {
        const reqBody = await req.json();
        const {id,postId} = reqBody;
        
        const user = await User.findOne({_id: id});
        const post = user.posts.find(post => post.id === postId);
        const session = await getSession(req);
        
        var currentUserId;
        if(session) {
            const sessionUser = await User.findOne({email: session.email});
             currentUserId = sessionUser._id.toString();
            var isLiked ;
            if(post.likes.includes(sessionUser._id.toString())){
                 isLiked = true;
            } else {
                 isLiked = false
            }
        }
          var likeCount;
          var commentCount;
        if(post) {
         commentCount = post.comments.length;
         likeCount = post.likes.length;
        }
        return NextResponse.json({message: 'success',likeCount: likeCount,commentCount: commentCount, isLiked: isLiked,currentUserId: currentUserId},{status: 201})

    } catch (error) {
        return NextResponse.json({message: error},{status: 400})
    }
}