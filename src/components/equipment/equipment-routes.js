import Router from '@koa/router'
import * as equipmentController from "#components/equipment/equipment-controller.js"

const equipments = new Router()

equipments.get('/', equipmentController.getEquipmentList)
equipments.get('/:id', equipmentController.getEquipment)
equipments.post('/', equipmentController.createEquipment)
equipments.put('/:id', equipmentController.updateEquipment)
equipments.del('/:id', equipmentController.deleteEquipment)
equipments.get('/user/:id',equipmentController.getEquipmentByOwner)

export default equipments