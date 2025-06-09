import { Router } from 'express'

import AccountDatasourceImpl from '../../infrastructure/database/mongodb/datasoruces/account.datasourece.impl'
import { AccountRepositoryImpl } from '../../infrastructure/repositories/account.repository.impl'
import AccountController from './controller'

export class AccountRoutes {
  static get routes (): Router {
    const router = Router()

    const datasource = new AccountDatasourceImpl()
    const repository = new AccountRepositoryImpl(datasource)
    const controller = new AccountController(repository)

    router.get('/', controller.getAllAccounts)
    router.get('/:id', controller.getAccountById)
    router.post('/', controller.create)
    router.put('/:id', controller.update)
    router.delete('/:id', controller.delete)

    return router
  }
}
