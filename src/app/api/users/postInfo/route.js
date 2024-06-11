import User from "@/models/UserSchema";
import dbConnect from "@/utils/db";
import { getSession } from "@/utils/getSession";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

dbConnect();
export async function POST(req){
    try {
        const session = await getSession(req);
        const reqBody = await req.json();
        const {title,imageUrl,tags} = reqBody;
       
        const user = await User.findOne({email: session.email});
        if(!user){
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        if(!user.posts){
            user.posts = []
        }
        const postId = uuidv4();
        user.posts.push({
            title: title,
            imageUrl: imageUrl,
            tags: tags,
            id: postId,
            likes: [],
            comments: [],
            
        }) 
        await user.save();
        return NextResponse.json({message: 'success'},{status: 201})

    } catch (error) {
        return NextResponse.json({message: 'error while posting'},{status: 400})
    }
}