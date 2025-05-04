import { Request, Response } from 'express'

export default class TransactionController {
  public getAllTransactions = (_req: Request, res: Response): void => {
    res.status(200).json({ message: 'Get All Transactions Controller endpoint' })
    // TODO: Implementation to fetch all transactions from DB
  }

  public create = (_req: Request, res: Response): void => {
    res.status(200).json({ message: 'Create Transaction Controller endpoint' })
    // TODO: Implementation to create a new transaction in DB
  }

  public update = (_req: Request, res: Response): void => {
    res.status(200).json({ message: 'Update Transaction Controller endpoint' })
    // TODO: Implementation to update a transaction in DB
  }

  public delete = (_req: Request, res: Response): void => {
    res.status(200).json({ message: 'Delete Transaction Controller endpoint' })
    // TODO: Implementation to delete a transaction from DB
  }
}
