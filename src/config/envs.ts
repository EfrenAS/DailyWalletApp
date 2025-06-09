import 'dotenv/config'
import { get } from 'env-var'

export const ENVS = {
  PORT: get('PORT').required().asPortNumber(),
  MONGO_USERNAME: get('MONGO_USERNAME').required().asString(),
  MONGO_PASSWORD: get('MONGO_PASSWORD').required().asString(),
  MONGO_DB: get('MONGO_DB').required().asString(),
  MONGO_URL: get('MONGO_URL').required().asUrlString(),
  JWT_SECRET_PHRASE: get('JWT_SECRET_PHRASE').required().asString()
}
