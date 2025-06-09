import { NextFunction, Request, Response } from 'express'
import { CreateAccountDto } from '../../domain/dtos/account/create-account.dto'
import { DeleteAccountDto } from '../../domain/dtos/account/delete-account.dto'
import { GetAccountByIdDto } from '../../domain/dtos/account/get-account-by-id.dto'
import { UpdateAccountDto } from '../../domain/dtos/account/update-account.dto'
import { AccountError } from '../../domain/errors/account.error'
import { HttpError } from '../../domain/errors/http.error'
import MongoError from '../../domain/errors/mongo.error'
import AccountRepository from '../../domain/repositories/account.repository'

export default class AccountController {
  constructor (
    private readonly accountRepository: AccountRepository
  ) {}

  public getAllAccounts = (req: Request, res: Response, next: NextFunction): void => {
    this.accountRepository.getAll()
      .then(accounts => { res.json(accounts) })
      .catch(err => {
        if (err instanceof AccountError) return next(HttpError.badRequest(err.message))

        if (err instanceof MongoError) return next(HttpError.internalServer(err.message))

        return next(HttpError.internalServer('An unknown error occurred'))
      })
  }

  public getAccountById = (req: Request, res: Response, next: NextFunction): void => {
    const id = req.params.id

    const [error, idValidated] = GetAccountByIdDto.create(id)

    if (error) {
      res.status(400).json({ error })
      return
    }

    this.accountRepository.getById(idValidated!)
      .then(account => { res.json(account) })
      .catch(err => {
        if (err instanceof AccountError) return next(HttpError.badRequest(err.message))

        if (err instanceof MongoError) return next(HttpError.internalServer(err.message))

        return next(HttpError.internalServer('An unknown error occurred'))
      })
  }

  public create = (req: Request, res: Response, next: NextFunction): void => {
    const [error, accountDto] = CreateAccountDto.create(req.body)

    if (error) {
      res.status(400).json({ error })
      return
    }

    this.accountRepository.create(accountDto!)
      .then(account => { res.status(201).json(account) })
      .catch(err => {
        console.error(err)
        if (err instanceof AccountError) return next(HttpError.badRequest(err.message))

        if (err instanceof MongoError) return next(HttpError.internalServer(err.message))

        return next(HttpError.internalServer('An unknown error occurred'))
      })
  }

  public update = (req: Request, res: Response, next: NextFunction): void => {
    const id = req.params.id

    const dataToValidate = { id, ...req.body }

    const [error, updateAccountDto] = UpdateAccountDto.create(dataToValidate)

    if (error) {
      res.status(400).json({ error })
      return
    }

    this.accountRepository.updated(id, updateAccountDto!)
      .then(account => { res.json(account) })
      .catch(err => {
        console.error(err)
        if (err instanceof AccountError) return next(HttpError.badRequest(err.message))

        if (err instanceof MongoError) return next(HttpError.internalServer(err.message))

        return next(HttpError.internalServer('An unknown error occurred'))
      })
  }

  public delete = (req: Request, res: Response, next: NextFunction): void => {
    const id = req.params.id

    const [error, idValidated] = DeleteAccountDto.create(id)

    if (error) {
      res.status(400).json({ error })
      return
    }

    this.accountRepository.delete(idValidated!)
      .then(account => { res.json(account) })
      .catch(err => {
        console.error(err)
        if (err instanceof AccountError) return next(HttpError.badRequest(err.message))

        if (err instanceof MongoError) return next(HttpError.internalServer(err.message))

        return next(HttpError.internalServer('An unknown error occurred'))
      })
  }
}
