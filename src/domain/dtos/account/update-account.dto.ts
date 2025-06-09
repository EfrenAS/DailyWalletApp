import CustomValidator from '../../validators/custom.validator'

export class UpdateAccountDto {
  private constructor (
    public readonly id: string,
    public cardNumber?: number,
    public bankName?: string,
    public holderName?: string

  ) {}

  public static create (props: { [key: string]: any }): [Object?, Partial<UpdateAccountDto>?] {
    const { id, cardNumber, bankName, holderName } = props

    const validator = new CustomValidator<UpdateAccountDto>({ id, cardNumber, bankName, holderName })

    validator.field('id')
      .required('El id es requerido')
      .isObjectId('El id debe ser un string válido')

    validator.field('cardNumber')
      .optional()
      .isInteger('El número de tarjeta debe ser un valor númerico')
      .length(4, 'El número de tarjeta debe de ser de 4 dígitos')

    validator.field('bankName')
      .optional()
      .isString('El nombre del banco debe ser una cadena válida')

    validator.field('holderName')
      .optional()
      .isString('El nombre debe de ser una cadena válida')

    const errors = validator.validate()

    if (Object.keys(errors).length > 0) return [errors, undefined]

    const dto = new UpdateAccountDto(id, cardNumber, bankName, holderName)

    return [undefined, this.setObject(dto)]
  }

  private static setObject (dto: UpdateAccountDto): Record<string, any> {
    const returnObj: Record<string, any> = {}

    Object.entries(dto).forEach(([key, value]) => {
      if (value !== undefined && !key.startsWith('_')) returnObj[key] = value
    })

    return returnObj
  }
}
