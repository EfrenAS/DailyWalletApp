import { Request, Response } from 'express'

export default class UserController {
  public getAllUsers = (_req: Request, res: Response): void => {
    res.status(200).json({ message: 'Get All Users Controller endpoint' })
    // TODO: Implementation to fetch all users from DB
  }

  public getUserById = (_req: Request, res: Response): void => {
    res.status(200).json({ message: 'Get User By Id Controller endpoint' })
    // TODO: Implementation to fetch user by id from DB
  }

  public create = (_req: Request, res: Response): void => {
    res.status(200).json({ message: 'Create User Controller endpoint' })
    // TODO: Implementation to create a new user in DB
  }

  public update = (_req: Request, res: Response): void => {
    res.status(200).json({ message: 'Update User Controller endpoint' })
    // TODO: Implementation to update a user in DB
  }

  public delete = (_req: Request, res: Response): void => {
    res.status(200).json({ message: 'Delete User Controller endpoint' })
    // TODO: Implementation to delete a user from DB
  }
}
