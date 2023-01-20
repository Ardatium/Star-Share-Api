import User from '#components/user/user-model.js'
import Joi from 'joi'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import logger from '../../logger'

export async function getUserList(ctx) {
    try {
        const result = await User.find({})
        ctx.ok(result)
    } catch(e) {
        logger.error(e.message)
        ctx.badRequest({ message: e.message })
    }
}

export async function getUser(ctx) {
    try {
        const result = await User.findById(ctx.params.id)
        ctx.ok(result)
    } catch(e) {
        logger.error(e.message)
        ctx.badRequest({ message: e.message })
    }
}

export async function createUser(ctx) {
    try {
        console.log(ctx.request.body)
        const userValidationSchema = Joi.object({
            name: Joi.string(),
            first_name: Joi.string(),
            pseudonyme: Joi.string().required(),
            password: Joi.string().required(),
            email: Joi.string().required()
        })
        const { error, value } = userValidationSchema.validate(ctx.request.body)
        if(error) throw new Error(error)
        await bcrypt.hash(ctx.request.body.password, 10)
            .then((hash) => {
                value.password = hash
            })
            .catch((e) => ctx.badRequest({ message: e.message }))
        console.log('No error found continuing the process', value)
        const result = await User.create(value)
        ctx.ok(result)
    } catch(e) {
        logger.error(e.message)
        ctx.badRequest({ message: e.message })
    }
}

export async function updateUser(ctx) {
    try {
        console.log(ctx.request.body)
        const userValidationSchema = Joi.object({
            name: Joi.string(),
            first_name: Joi.string(),
            pseudonyme: Joi.string().required(),
            password: Joi.string().required(),
            email: Joi.string().required()
        })
        const { error, value } = userValidationSchema.validate(ctx.request.body)
        if(error) {
            logger.error(error.message)
            throw new Error(error)
        } 
        console.log('No error found continuing the process', value)

        const result = await User.findByIdAndUpdate(ctx.params.id, value, { runValidators: true, new: true })
        ctx.ok(result)
    } catch (e) {
        logger.error(e.message)
        ctx.badRequest({ message: e.message })
    }
}

export async function deleteUser(ctx) {
    try {
        const result = await User.findByIdAndDelete(ctx.params.id)
        ctx.ok(result)
    } catch (e) {
        logger.error(e.message)
        ctx.badRequest({ message: e.message })
    }
}

export async function login(ctx) {
    try {
        const user = await User.findOne({ email: ctx.request.body.email })
        //console.log(ctx.request.body.password)
        console.log(user)
        console.log(user.password)
        const valid = await bcrypt.compare(ctx.request.body.password, user.password)
        if (valid) {
            const token = jwt.sign({userId: user._id},'RANDOM_TOKEN_SECRET', { expiresIn: '24h'});
            user.password = '';
            ctx.ok({
                token: token,
                user: user
            })
        }
    } catch (e) {
        logger.error(e.message)
        ctx.badRequest({ message: e.message })
    }
}