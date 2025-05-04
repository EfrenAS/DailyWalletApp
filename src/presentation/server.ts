import express, { Router } from 'express'

interface ServerConfig {
  port: number
  routes: Router
}

export class Server {
  private readonly app = express()
  private readonly PORT: number
  private readonly ROUTES: Router

  constructor (params: ServerConfig) {
    this.PORT = params.port
    this.ROUTES = params.routes
  }

  public async start (): Promise<void> {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(this.ROUTES)

    this.app.listen(this.PORT, () => {
      console.log(`Server is running on port ${this.PORT}`)
    })
  }
}
