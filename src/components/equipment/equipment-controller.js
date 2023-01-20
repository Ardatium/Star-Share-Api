import Equipment from '#components/equipment/equipment-model.js'
import Joi from 'joi'
import logger from '../../logger'

export async function getEquipmentList(ctx) {
    try {
        const result = await Equipment.find({})
        ctx.ok(result)
    } catch(e) {
        logger.error(e.message)
        ctx.badRequest({ message: e.message })
    }
}

export async function getEquipment(ctx) {
    try {
        const result = await Equipment.findById(ctx.params.id)
        ctx.ok(result)
    } catch(e) {
        logger.error(e.message)
        ctx.badRequest({ message: e.message })
    }
}

export async function createEquipment(ctx) {
    try {
        console.log(ctx.request.body)
        const equipmentValidationSchema = Joi.object({
            name: Joi.string().required(),
            aperture: Joi.number().required(),
            focal: Joi.number().required(),
            lens: Joi.array(),
            photography: Joi.boolean(),
            owner: Joi.string().required()
        })
        const { error, value } = equipmentValidationSchema.validate(ctx.request.body)
        if(error) throw new Error(error)
        console.log('No error found continuing the process', value)

        const result = await Equipment.create(value)
        ctx.ok(result)
    } catch(e) {
        logger.error(e.message)
        ctx.badRequest({ message: e.message })
    }
}

export async function updateEquipment(ctx) {
    try {
        console.log(ctx.request.body)
        const equipmentValidationSchema = Joi.object({
            name: Joi.string().required(),
            aperture: Joi.number().required(),
            focal: Joi.number().required(),
            lens: Joi.array(),
            photography: Joi.boolean(),
            owner: Joi.string().required()
        })
        const { error, value } = equipmentValidationSchema.validate(ctx.request.body)
        if(error) throw new Error(error)
        console.log('No error found continuing the process', value)

        const result = await Equipment.findByIdAndUpdate(ctx.params.id, value, { runValidators: true, new: true })
        ctx.ok(result)
    } catch (e) {
        logger.error(e.message)
        ctx.badRequest({ message: e.message })
    }
}

export async function deleteEquipment(ctx) {
    try {
        const result = await Equipment.findByIdAndDelete(ctx.params.id)
        ctx.ok(result)
    } catch (e) {
        logger.error(e.message)
        ctx.badRequest({ message: e.message })
    }
}

export async function getEquipmentByOwner(ctx) {
    try {
        const result = await Equipment.find({owner: ctx.params.id})
        ctx.ok(result)
    } catch (e) {
        logger.error(e.message)
        ctx.badRequest({ message: e.message})
    }
}