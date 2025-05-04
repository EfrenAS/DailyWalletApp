import { Request, Response } from 'express'

export default class AccountController {
  public getAllAccounts = (_req: Request, res: Response): void => {
    res.status(200).json({ message: 'Get All Accounts Controller endpoint' })
    // TODO: Implementation to fetch all users from DB
  }

  public getAccountById = (_req: Request, res: Response): void => {
    res.status(200).json({ message: 'Get Account By Id Controller endpoint' })
    // TODO: Implementation to fetch user by id from DB
  }

  public create = (_req: Request, res: Response): void => {
    res.status(200).json({ message: 'Create Account Controller endpoint' })
    // TODO: Implementation to create a new user in DB
  }

  public update = (_req: Request, res: Response): void => {
    res.status(200).json({ message: 'Update Account Controller endpoint' })
    // TODO: Implementation to update a user in DB
  }

  public delete = (_req: Request, res: Response): void => {
    res.status(200).json({ message: 'Delete Account Controller endpoint' })
    // TODO: Implementation to delete a user from DB
  }
}
