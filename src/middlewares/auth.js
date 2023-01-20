import { verify } from 'jsonwebtoken';
import User from '#components/user/user-model.js';

/*
export default (req, res, next) => {
    try {
        const email = req.headers.email;
        const token = req.headers.authorization;
        const decodeToken = verify(token, 'RANDOM_TOKEN_SECRET');
        User.findById(decodeToken.userId)
            .then((user) => {
            console.log(2);
                if (email == user.email) {
                    next();
                } else {
                    res.status(403).json({message: 'UNAUTHORIZED 1'});
                }
            })
            .catch(() => res.status(403).json({message: 'UNAUTHORIZED 2'}))

            console.log(3)
    } catch {
        res.status(403).json({message: 'UNAUTHORIZED 3'})
    }
};
*/

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