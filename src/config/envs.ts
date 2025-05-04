import { get } from 'env-var'

export const ENVS = {
  PORT: get('PORT').default(3000).asPortNumber()
}
