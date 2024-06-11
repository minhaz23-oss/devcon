import dbConnect from "@/utils/db";
import User from "@/models/UserSchema";
import bcrypt from 'bcryptjs';
import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

export const authOptions = {
    providers:[
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials:{
                email: {label: 'email',type: 'text',placeholder: 'email'},
                password: {label: 'password',type: 'password',placeholder: 'password'}
            },
            async authorize(credentails){
                await dbConnect();
                try {
                   const user = await User.findOne({email:credentails.email});
                   if(user){
                     const isPasswordCorrect = await bcrypt.compare(credentails.password,user.password);
                     if(isPasswordCorrect){
                        return {id: user._id.toString(),user: user.username, email: user.email}
                     } else {
                        console.log('password is in correct');
                     }
                   } else {
                     console.log('user not found')
                   }
                } catch (error) {
                  throw new Error(error) 
                }
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        })
    ],
    pages: {
        signIn: '/Login',
        error: '/auth/error'
    },
    callbacks: {
        async signIn({user,account}){
            await dbConnect();
            if(account.provider === 'github'){
                const userExists = await User.findOne({email: user.email});
                if(!userExists){
                    const newUser = new User({
                        email: user.email
                    })
                    await newUser.save();
                   return true
                }
            }
            return true
        },
        async jwt({ token , user }){
            if(user) {
                token.id = user.id;
            }
            return token;
        },
        async session({session,token}){
            if(token.id){
                session.user.id = token.id
            }else {
                console.error('Token doesnt have an id',token)
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        jwt: true
    }
};

const handler = (req,res) => NextAuth(req,res,authOptions);
export { handler as GET, handler as POST };