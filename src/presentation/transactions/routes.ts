import { Router } from 'express'
import TransactionController from './controller'

export class TransactionRoutes {
  static get routes (): Router {
    const router = Router()

    const controller = new TransactionController()

    router.get('/', controller.getAllTransactions)
    router.post('/', controller.create)
    router.put('/:id', controller.update)
    router.delete('/:id', controller.delete)

    return router
  }
}
