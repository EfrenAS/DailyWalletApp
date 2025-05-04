import { Router } from 'express'

import BalanceController from './controller'

export class BalanceRoutes {
  static get routes (): Router {
    const router = Router()

    const controller = new BalanceController()

    router.get('/', controller.getAllBalances)
    router.post('/', controller.create)

    return router
  }
}
