import { NextFunction, Request, Response } from 'express'
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto'
import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto'
import AuthError from '../../domain/errors/auth.error'
import { HttpError } from '../../domain/errors/http.error'
import MongoError from '../../domain/errors/mongo.error'
import { AuthRepository } from '../../domain/repositories/auth.repository'

export default class AuthController {
  constructor (
    private readonly authRepository: AuthRepository
  ) {}

  public register = (req: Request, res: Response, next: NextFunction): void => {
    const [errors, registerUserDto] = RegisterUserDto.create(req.body)

    if (errors !== undefined) {
      res.status(400).json({
        type: 'validation_error',
        message: 'Validation failed',
        errors
      })
      return
    }

    this.authRepository
      .register(registerUserDto!)
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        if (err instanceof AuthError) return next(HttpError.badRequest(err.message))

        if (err instanceof MongoError) return next(HttpError.internalServer(err.message))

        return next(HttpError.internalServer('An unknown error occurred'))
      })
  }

  public login = (req: Request, res: Response, next: NextFunction): void => {
    const [errors, loginUserDto] = LoginUserDto.create(req.body)

    if (errors !== undefined) {
      res.status(400).json({
        type: 'validation_error',
        message: 'Validation failed',
        errors
      })
      return
    }

    this.authRepository
      .login(loginUserDto!)
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        if (err instanceof AuthError) return next(HttpError.badRequest(err.message))

        if (err instanceof MongoError) return next(HttpError.internalServer(err.message))

        return next(HttpError.internalServer('An unknown error occurred'))
      })
  }
}
