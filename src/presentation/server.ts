import express, { Router } from 'express'
import { normalizeBody } from '../infrastructure/middlewares/normalizeBody'
import errorMiddleware from './middlewares/error.middleware'

interface ServerConfig {
  port: number
  routes: Router
}

export class Server {
  public readonly app = express()
  private serverListener?: any
  private readonly PORT: number
  private readonly ROUTES: Router

  constructor (options: ServerConfig) {
    const { port, routes } = options
    this.PORT = port
    this.ROUTES = routes
  }

  public async start (): Promise<void> {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(normalizeBody)
    this.app.use(this.ROUTES)
    this.app.use(errorMiddleware)

    this.serverListener = this.app.listen(this.PORT, () => {
      console.log(`Server is running on port ${this.PORT}`)
    })
  }

  public close (): void {
    this.serverListener?.close()
  }
}
