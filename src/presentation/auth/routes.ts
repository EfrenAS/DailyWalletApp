import { Router } from 'express'
import AuthDatasourceImpl from '../../infrastructure/database/mongodb/datasoruces/auth.datasoruce.impl'
import { AuthRepositoryImpl } from '../../infrastructure/repositories/auth.repository.impl'
import AuthController from './controller'

export class AuthRoutes {
  static get routes (): Router {
    const router = Router()
    const datasource = new AuthDatasourceImpl()
    const repository = new AuthRepositoryImpl(datasource)
    const controller = new AuthController(repository)

    router.post('/register', controller.register)
    router.post('/login', controller.login)

    return router
  }
}
