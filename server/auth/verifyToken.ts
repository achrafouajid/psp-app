import { cookies } from "next/headers"
import * as jose from 'jose';

export default async function verifyToken() {
    try {


        const authToken = cookies().get("authToken")!.value
        const secret = new TextEncoder().encode(
            process.env.JWT_SECRET
        )
        const { payload, protectedHeader } = await jose.jwtVerify(authToken, secret, {
            algorithms: ['HS256'],
        });
        return true;

    } catch (error) {
        console.log(error)
        return false;
    }

}