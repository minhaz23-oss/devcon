import { getSession } from "@/utils/getSession";;
import User from "@/models/UserSchema";
import dbConnect from "@/utils/db";
import { NextResponse } from "next/server";


dbConnect();
export async function POST(req) {
    try {
        const session = await getSession(req);
        const reqBody = await req.json();
        const {username,bio,imageUrl} = reqBody;
        //finding the user
        const user = await User.findOne({email: session.email});
        if(!user){
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        user.username = username || user.username ;
        if(!user.profileInfo){
            user.profileInfo = {};
        }
   

        user.profileInfo = {
            bio: bio || user.profileInfo.bio, 
            imageUrl: imageUrl || user.profileInfo.imageUrl 
        };

        
        const savedUser = await user.save();
       
        return NextResponse.json({message: 'success'},{status: 201})
    } catch (error) {
        return NextResponse.json({message: 'there is an error'},{status: 400})
    }
}