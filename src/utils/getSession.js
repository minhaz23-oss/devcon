import { getToken } from "next-auth/jwt";
const secret = process.env.NEXTAUTH_SECRET
export async function getSession(req){
    const token = await getToken({req,secret})
    return token;
}