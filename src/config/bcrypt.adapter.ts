import { compareSync, genSaltSync, hashSync } from 'bcrypt'

export const bcrypAdapter = {
  hash: (password: string) => hashSync(password, genSaltSync(10)),
  compare: (password: string, hashed: string) => compareSync(password, hashed)
}
