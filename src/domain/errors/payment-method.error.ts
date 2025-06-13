export class PaymentMethodError extends Error {
  constructor (
    public readonly message: string

  ) {
    super(message)
    this.stack = ''
  }

  static paymentMethodExist (message: string): PaymentMethodError {
    return new PaymentMethodError(message)
  }

  static paymentMethodNotFound (message: string): PaymentMethodError {
    return new PaymentMethodError(message)
  }
}
