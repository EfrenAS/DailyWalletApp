export default class AuthError extends Error {
  constructor (
    public readonly message: string

  ) {
    super(message)
    this.stack = ''
  }

  static emailExists (message: string): AuthError {
    return new AuthError(message)
  }

  static userNotFound (message: string): AuthError {
    return new AuthError(message)
  }

  static invalidPassword (message: string): AuthError {
    return new AuthError(message)
  }

  static invalidToken (message: string): AuthError {
    return new AuthError(message)
  }
}
