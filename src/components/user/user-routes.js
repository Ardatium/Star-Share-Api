import Router from '@koa/router'
import * as userController from "#components/user/user-controller.js"
import auth from "#middlewares/auth.js"

const users = new Router()

users.get('/',userController.getUserList)
users.get('/:id',userController.getUser)
users.post('/signup',userController.createUser)
users.put('/:id',userController.updateUser)
users.del('/:id',userController.deleteUser)
users.post('/login', userController.login)

export default users