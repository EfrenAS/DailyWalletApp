export default class MongoError extends Error {
  constructor (
    public readonly message: string
  ) {
    super(message)
  }

  static unknownError (message: string): MongoError {
    return new MongoError(message)
  }
}
