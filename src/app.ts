import { ENVS } from './config/envs'
import { MongoDatabase } from './data/mongo/init'
import { AppRoutes } from './presentation/routes'
import { Server } from './presentation/server'

void (
  async () => { await main() }
)()

async function main (): Promise<void> {
  await MongoDatabase.connect({
    mongoUri: ENVS.MONGO_URL,
    dbName: ENVS.MONGO_DB
  })

  const server = new Server({
    port: ENVS.PORT,
    routes: AppRoutes.routes
  })

  await server.start()
}
