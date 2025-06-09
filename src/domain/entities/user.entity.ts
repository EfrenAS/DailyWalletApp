export class UserEntity {
  constructor (
    public id: string,
    public username: string,
    public email: string,
    public emailConfirmed: string,
    public password: string,
    public role: string[],
    public createdAt: string,
    public updatedAt: string
  ) {}

  static fromObject (object: { [key: string]: any }): UserEntity {
    const { id, username, email, emailConfirmed, password, role, createdAt, updatedAt, _id } = object

    if (typeof username === 'undefined') throw new Error('Missing username')
    if (typeof email === 'undefined') throw new Error('Missing email')
    if (typeof emailConfirmed === 'undefined') throw new Error('Missing emailConfirmed')
    if (typeof password === 'undefined') throw new Error('Missing password')
    if (typeof role === 'undefined') throw new Error('Missing role')
    if (typeof createdAt === 'undefined') throw new Error('Missing createdAt')
    if (typeof updatedAt === 'undefined') throw new Error('Missing updatedAt')

    return new UserEntity(
      id || _id,
      username,
      email,
      emailConfirmed,
      password,
      role,
      createdAt,
      updatedAt
    )
  }
}
