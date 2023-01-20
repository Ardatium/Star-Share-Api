import Session from '#components/session/session-model.js'
import Joi from 'joi'

export async function getSessionList(ctx) {
    try {
        const result = await Session.find({})
        ctx.ok(result)
    } catch(e) {
        logger.error(e.message)
        ctx.badRequest({ message: e.message })
    }
}

export async function getSession(ctx) {
    try {
        const result = await Session.findById(ctx.params.id)
        ctx.ok(result)
    } catch(e) {
        logger.error(e.message)
        ctx.badRequest({ message: e.message })
    }
}

export async function createSession(ctx) {
    try {
        console.log(ctx.request.body)
        const sessionValidationSchema = Joi.object({
            organizer: Joi.string().required(),
            participants: Joi.array(),
            equipments: Joi.array(),
            targets: Joi.array(),
            place: Joi.any(),
            session_date: Joi.date(),
            duration: Joi.number(),
            rdv: Joi.string()
        })
        const { error, value } = sessionValidationSchema.validate(ctx.request.body)
        if(error) throw new Error(error)
        console.log('No error found continuing the process', value)

        const result = await Session.create(value)
        ctx.ok(result)
    } catch(e) {
        logger.error(e.message)
        ctx.badRequest({ message: e.message })
    }
}

export async function updateSession(ctx) {
    try {
        console.log(ctx.request.body)
        const sessionValidationSchema = Joi.object({
            organizer: Joi.string().required(),
            participants: Joi.array(),
            equipments: Joi.array(),
            targets: Joi.array(),
            session_date: Joi.date().required(),
            duration: Joi.number(),
            place: Joi.string().required(),
            rdv: Joi.string()
        })
        const { error, value } = sessionValidationSchema.validate(ctx.request.body)
        if(error) throw new Error(error)
        console.log('No error found continuing the process', value)

        const result = await Session.findByIdAndUpdate(ctx.params.id, value, { runValidators: true, new: true })
        ctx.ok(result)
    } catch (e) {
        logger.error(e.message)
        ctx.badRequest({ message: e.message })
    }
}

export async function deleteSession(ctx) {
    try {
        const result = await Session.findByIdAndDelete(ctx.params.id)
        ctx.ok(result)
    } catch (e) {
        logger.error(e.message)
        ctx.badRequest({ message: e.message })
    }
}

export async function getSessionByUser(ctx) {
    try {
        const result = await Session.find($or[{organizer: req.params.id},{participants: req.params.id}])
        ctx.ok(result)
    } catch (e) {
        logger.error(e.message)
        ctx.badRequest({ message: e.message})
    }
} 