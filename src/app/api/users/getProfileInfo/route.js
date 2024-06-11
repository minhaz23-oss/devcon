import User from "@/models/UserSchema";
import dbConnect from "@/utils/db";
import { NextResponse } from "next/server";
import { getSession } from "@/utils/getSession";

dbConnect();
export async function GET(req) {
    try {
       const session = await getSession(req);
       const user = await User.findOne({email: session.email});
       const followers = user.follows.length;
       return NextResponse.json({user: user,followers: followers},{status: 201})
    } catch (error) {
        return NextResponse.json({message: 'Error while fetching data'},{status: 400})
    }
}