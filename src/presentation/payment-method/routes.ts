import { Router } from 'express'
import { PaymentMethodDatasourceImpl } from '../../infrastructure/database/mongodb/datasoruces/payment-method.datasource.impl'
import { PaymentMethodRepositoryImpl } from '../../infrastructure/repositories/payment-method.repository.impl'
import { PaymentMethodController } from './controller'

export class PaymentMethodRoutes {
  static get routes (): Router {
    const router = Router()

    const datasource = new PaymentMethodDatasourceImpl()
    const repository = new PaymentMethodRepositoryImpl(datasource)
    const controller = new PaymentMethodController(repository)

    router.get('/', controller.getAll)
    router.get('/:id', controller.getById)
    router.post('/', controller.create)
    router.put('/:id', controller.updateById)
    router.delete('/:id', controller.deleteById)

    return router
  }
}
