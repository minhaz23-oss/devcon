
import dbConnect from "@/utils/db";
import User from "@/models/UserSchema";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'

dbConnect();

export async function POST(req){
    try {
        const reqBody = await req.json();
        const {username,email,password} = reqBody;
        //check if user exists
        const userExists = await User.findOne({email});
        if(userExists){
            return NextResponse.json({message: 'user already exists'},{status: 200}) 
            
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = new User({
            email,
            username,
            password: hashedPassword
        });
        user.save();
        return NextResponse.json({message: 'signed up successfully'},{status: 201})
    } catch (error) {
     return NextResponse.json({message: 'error while signing up'},{status: 400})   
    }
}