import { ENVS } from './config/envs'
import { AppRoutes } from './presentation/routes'
import { Server } from './presentation/server'

void (
  async () => { await main() }
)()

async function main (): Promise<void> {
  const server = new Server({
    port: ENVS.PORT,
    routes: AppRoutes.routes()
  })

  await server.start()
}
