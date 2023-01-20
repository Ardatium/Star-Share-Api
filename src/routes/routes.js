import Router from '@koa/router'
import equipmentRoutes from '#components/equipment/equipment-routes.js'
import sessionRoutes from '#components/session/session-routes.js'
import userRoutes from '#components/user/user-routes.js'

const API_V1_ROUTER = new Router({ prefix: '/api/v1' })

API_V1_ROUTER.use('/equipments', equipmentRoutes.routes(), equipmentRoutes.allowedMethods())
API_V1_ROUTER.use('/sessions', sessionRoutes.routes(), sessionRoutes.allowedMethods())
API_V1_ROUTER.use('/users', userRoutes.routes(), userRoutes.allowedMethods())

export { API_V1_ROUTER }