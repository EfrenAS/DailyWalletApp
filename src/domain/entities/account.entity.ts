export class AccountEntity {
  constructor (
    public id: string,
    public cardNumber: number,
    public bankName: string,
    public holderName: string,
    public createdAt: string,
    public updatedAt: string

  ) {}

  static fromObject (object: { [key: string]: any }): AccountEntity {
    const { id, cardNumber, bankName, holderName, createdAt, updatedAt, _id } = object

    if (typeof cardNumber === 'undefined') throw new Error('Missing cardNumber')
    if (typeof bankName === 'undefined') throw new Error('Missing bankName')
    if (typeof holderName === 'undefined') throw new Error('Missing holderName')
    if (typeof createdAt === 'undefined') throw new Error('Missing createdAt')
    if (typeof updatedAt === 'undefined') throw new Error('Missing updatedAt')

    return new AccountEntity(
      id || _id,
      cardNumber,
      bankName,
      holderName,
      createdAt,
      updatedAt
    )
  }
}
