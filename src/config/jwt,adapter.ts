import jwt, { SignOptions } from 'jsonwebtoken'
import { ENVS } from './envs'

const JWT_SECRET_PHRASE = ENVS.JWT_SECRET_PHRASE

export const jwtAdapter = {
  generateToken: async (payload: any, duration: SignOptions['expiresIn'] = '2h') => {
    const signOptions: SignOptions = { expiresIn: duration }

    return await new Promise((resolve) => {
      jwt.sign(payload, JWT_SECRET_PHRASE, signOptions, (err, token) => {
        if (err != null) return resolve(null)

        return resolve(token)
      })
    })
  },

  validateToken: async <T>({ token }: { token: string }): Promise<T | null> => {
    return await new Promise((resolve) => {
      jwt.verify(token, JWT_SECRET_PHRASE, (err, decoded) => {
        if (err != null) return resolve(null)

        return resolve(decoded as T)
      })
    })
  }
}
