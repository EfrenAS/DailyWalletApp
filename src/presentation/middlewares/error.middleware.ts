import { NextFunction, Request, Response } from 'express'
import { HttpError } from '../../domain/errors/http.error'

export default function errorMiddleware (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const statusCode = err instanceof HttpError ? err.statusCode : 500
  const message = err instanceof HttpError ? err.message : 'Internal Server Error'

  res.status(statusCode).json({ error: message })
}
