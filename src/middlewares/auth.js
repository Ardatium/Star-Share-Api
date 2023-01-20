import { verify } from 'jsonwebtoken';
import User from '#components/user/user-model.js';

export default async (ctx, next) => {
    try {
        const email = ctx.headers.email;
        const token = ctx.headers.authorization;
        const decodeToken = verify(token, 'RANDOM_TOKEN_SECRET');
        const user = await User.findById(decodeToken.userId)
        /*console.log(decodeToken.userId)
        console.log(email)
        console.log(user.email)*/
        console.log(ctx)
        if (email == user.email) {
            next();
        } else {
            ctx.badRequest({message: "Unauthorized"});
        }
    } catch (e) {
        ctx.badRequest({message: e.message})
    }
}