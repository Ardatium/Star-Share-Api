import Router from '@koa/router'
import * as sessionController from "#components/session/session-controller.js"

const sessions = new Router()

sessions.get('/', sessionController.getSessionList)
sessions.get('/:id', sessionController.getSession)
sessions.post('/', sessionController.createSession)
sessions.put('/:id', sessionController.updateSession)
sessions.del('/:id', sessionController.deleteSession)
sessions.get('/user/:id', sessionController.getSessionByUser)

export default sessions