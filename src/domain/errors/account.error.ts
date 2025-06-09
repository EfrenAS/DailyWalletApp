export class AccountError extends Error {
  constructor (
    public readonly message: string

  ) {
    super(message)
    this.stack = ''
  }

  static cardNumberExists (message: string): AccountError {
    return new AccountError(message)
  }

  static accountNotFound (message: string): AccountError {
    return new AccountError(message)
  }
}
