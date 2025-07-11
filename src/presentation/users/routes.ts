import { Router } from 'express'
import UserController from './controller'

export class UserRoutes {
  static get routes (): Router {
    const router = Router()

    const controller = new UserController()

    router.get('/', controller.getAllUsers)
    router.get('/:id', controller.getUserById)
    router.post('/', controller.create)
    router.put('/:id', controller.update)
    router.delete('/:id', controller.delete)

    return router
  }
}
