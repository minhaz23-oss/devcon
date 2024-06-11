import dbConnect from "@/utils/db";
import User from "@/models/UserSchema";
import { NextResponse } from "next/server";

dbConnect();
export async function POST(req) {
    try {
        const reqBody = await req.json();
        const {keyword} = reqBody;
        const users = await User.find({
          $or: [
              { 'posts.title': { $regex: keyword, $options: 'i' } },
              { 'posts.tags': { $regex: keyword, $options: 'i' } },
          ],
      });
          
      const result = users.map(user => {
      
        const matchingPosts = user.posts.filter(post => 
            post.title.toLowerCase().includes(keyword.toLowerCase()) || 
            post.tags.toLowerCase().includes(keyword.toLowerCase())
        );

        return {
            ...user._doc, // Include all user information
            posts: matchingPosts // Only include matching posts
        };
    });
          
      return NextResponse.json({message: 'success',posts: result},{status: 201})   
    } catch (error) {
      return NextResponse.json({message: error},{status: 400})   
    }
}