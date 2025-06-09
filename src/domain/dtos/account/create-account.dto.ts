import CustomValidator from '../../validators/custom.validator'

export class CreateAccountDto {
  private constructor (
    public readonly cardNumber: number,
    public readonly bankName: string,
    public readonly holderName: string
  ) {}

  static create (object: { [key: string]: any }): [Object?, CreateAccountDto?] {
    const { cardNumber, bankName, holderName } = object

    const validator = new CustomValidator<CreateAccountDto>({ cardNumber, bankName, holderName })

    validator.field('cardNumber')
      .required('El número de tarjeta es requerido')
      .isInteger('El número de tarjeta debe ser un valor númerico')
      .length(4, 'El número de tarjeta debe de ser de 4 dígitos')

    validator.field('bankName')
      .required('El nombre del banco es requerido')
      .isString('El nombre del banco debe ser una cadena válida')

    validator.field('holderName')
      .required('El nombre del titular es requerido')
      .isString('El nombre debe de ser una cadena válida')

    const errors = validator.validate()

    if (Object.keys(errors).length > 0) return [errors, undefined]

    return [undefined, new CreateAccountDto(cardNumber, bankName, holderName)]
  }
}
