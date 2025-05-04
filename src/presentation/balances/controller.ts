import { Request, Response } from 'express'

export default class BalanceController {
  public getAllBalances = (_req: Request, res: Response): void => {
    res.status(200).json({ message: 'Get All Balances Controller endpoint' })
    // TODO: Implementation to fetch all balances from DB
  }

  public create = (_req: Request, res: Response): void => {
    res.status(200).json({ message: 'Create Balance Controller endpoint' })
    // TODO: Implementation to create a new balance in DB
  }
}
