import { Router } from 'express'
import { AccountRoutes } from './account/routes'
import { BalanceRoutes } from './balances/routes'
import { TransactionRoutes } from './transactions/routes'
import { UserRoutes } from './users/routes'

export const AppRoutes = {
  routes (): Router {
    const router = Router()

    // TODO: Implement routes

    router.use('/api/user', UserRoutes.routes)
    router.use('/api/account', AccountRoutes.routes)
    router.use('/api/transaction', TransactionRoutes.routes)
    router.use('/api/balance', BalanceRoutes.routes)

    return router
  }
}
