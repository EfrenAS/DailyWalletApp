import { NextFunction, Request, Response } from 'express'
import { CreatePaymentMethodDto } from '../../domain/dtos/payment-method/create-payment-method.dto'
import { DeletePaymentMethodDto } from '../../domain/dtos/payment-method/delete-payment-method.dto'
import { GetPaymentMethodByIdDto } from '../../domain/dtos/payment-method/get-payment-method-by-id.dto'
import { UpdatePaymentMethodDto } from '../../domain/dtos/payment-method/update-payment-method.dto'
import { HttpError } from '../../domain/errors/http.error'
import MongoError from '../../domain/errors/mongo.error'
import { PaymentMethodError } from '../../domain/errors/payment-method.error'
import PaymentMethodRepository from '../../domain/repositories/payment-method.repository'

export class PaymentMethodController {
  constructor (
    private readonly paymentMethodRepository: PaymentMethodRepository
  ) {}

  public getAll = (_req: Request, res: Response, next: NextFunction): void => {
    this.paymentMethodRepository.getAll()
      .then(paymentMethods => {
        res.json(paymentMethods)
      })
      .catch(err => {
        if (err instanceof PaymentMethodError) return next(HttpError.badRequest(err.message))

        if (err instanceof MongoError) return next(HttpError.internalServer(err.message))

        return next(HttpError.internalServer('An unknown error occurred'))
      })
  }

  public getById = (req: Request, res: Response, next: NextFunction): void => {
    const { id } = req.params
    const [error, idDto] = GetPaymentMethodByIdDto.create(id)

    if (error) {
      res.status(400).json({ error })
      return
    }

    this.paymentMethodRepository.getById(idDto!)
      .then(paymentMethod => {
        res.json(paymentMethod)
      })
      .catch(err => {
        if (err instanceof PaymentMethodError) return next(HttpError.badRequest(err.message))

        if (err instanceof MongoError) return next(HttpError.internalServer(err.message))

        return next(HttpError.internalServer('An unknown error occurred'))
      })
  }

  public create = (req: Request, res: Response, next: NextFunction): void => {
    const [error, createDto] = CreatePaymentMethodDto.create(req.body)

    if (error) {
      res.status(400).json({ error })
      return
    }

    this.paymentMethodRepository.create(createDto!)
      .then(paymentMethod => {
        res.status(201).json(paymentMethod)
      })
      .catch(err => {
        if (err instanceof PaymentMethodError) return next(HttpError.badRequest(err.message))

        if (err instanceof MongoError) return next(HttpError.internalServer(err.message))

        return next(HttpError.internalServer('An unknown error occurred'))
      })
  }

  public updateById = (req: Request, res: Response, next: NextFunction): void => {
    const { id } = req.params
    const [error, updateDto] = UpdatePaymentMethodDto.create({ id, ...req.body })

    if (error) {
      res.status(400).json({ error })
      return
    }

    this.paymentMethodRepository.updateById(id, updateDto!)
      .then(paymentMethod => {
        res.json(paymentMethod)
      })
      .catch(err => {
        if (err instanceof PaymentMethodError) return next(HttpError.badRequest(err.message))

        if (err instanceof MongoError) return next(HttpError.internalServer(err.message))

        return next(HttpError.internalServer('An unknown error occurred'))
      })
  }

  public deleteById = (req: Request, res: Response, next: NextFunction): void => {
    const { id } = req.params
    const [error, idDeleteDto] = DeletePaymentMethodDto.create(id)

    if (error) {
      res.status(400).json({ error })
      return
    }

    this.paymentMethodRepository.deleteById(idDeleteDto!)
      .then(paymentMethod => {
        res.json(paymentMethod)
      })
      .catch(err => {
        if (err instanceof PaymentMethodError) return next(HttpError.badRequest(err.message))

        if (err instanceof MongoError) return next(HttpError.internalServer(err.message))

        return next(HttpError.internalServer('An unknown error occurred'))
      })
  }
}
