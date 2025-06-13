export class PaymentMethodEntity {
  constructor (
    public readonly id: string,
    public readonly nameMethod: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly abbreviation?: string,
    public readonly description?: string
  ) {}

  static fromObject (object: { [key: string]: any }): PaymentMethodEntity {
    const { id, nameMethod, description, abbreviation, createdAt, updatedAt, _id } = object

    if (typeof id === 'undefined' && typeof _id === 'undefined') throw new Error('Missing id')
    if (typeof nameMethod === 'undefined') throw new Error('Missing nameMethod')
    if (typeof createdAt === 'undefined') throw new Error('Missing createdAt')
    if (typeof updatedAt === 'undefined') throw new Error('Missing updatedAt')

    return new PaymentMethodEntity(
      id || _id,
      nameMethod,
      createdAt,
      updatedAt,
      abbreviation,
      description
    )
  }
}
