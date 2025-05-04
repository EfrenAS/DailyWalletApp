import { Router } from 'express'

import AccountController from './controller'

export class AccountRoutes {
  static get routes (): Router {
    const router = Router()

    const controller = new AccountController()

    router.get('/', controller.getAllAccounts)
    router.get('/:id', controller.getAccountById)
    router.post('/', controller.create)
    router.put('/:id', controller.update)
    router.delete('/:id', controller.delete)

    return router
  }
}
