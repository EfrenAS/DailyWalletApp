import CustomValidator from '../../validators/custom.validator'

export class GetPaymentMethodByIdDto {
  private constructor (
    public readonly id: string
  ) {}

  static create (id: string): [Object?, string?] {
    const validator = new CustomValidator<GetPaymentMethodByIdDto>({ id })

    validator.field('id')
      .required('El id es requerido')
      .isObjectId('El id debe ser un string válido')

    const errors = validator.validate()

    if (Object.keys(errors).length > 0) return [errors, undefined]

    return [undefined, id]
  }
}
