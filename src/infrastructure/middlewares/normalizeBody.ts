import { NextFunction, Request, Response } from 'express'

export function normalizeBody (req: Request, res: Response, next: NextFunction): void {
  if (req.body === undefined) {
    req.body = {}
  }

  next()
}
