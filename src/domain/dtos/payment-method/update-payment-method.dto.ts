import CustomValidator from '../../validators/custom.validator'

export class UpdatePaymentMethodDto {
  private constructor (
    public readonly id: string,
    public readonly nameMethod?: string,
    public readonly description?: string,
    public readonly abbreviation?: string
  ) {}

  static create (object: { [key: string]: any }): [Object?, UpdatePaymentMethodDto?] {
    const { id, nameMethod, description, abbreviation } = object

    const validator = new CustomValidator<UpdatePaymentMethodDto>({ id, nameMethod, description, abbreviation })

    validator.field('id')
      .required('El id es requerido')
      .isObjectId('El id debe ser un string válido')

    validator.field('nameMethod')
      .optional()
      .isString('El nombre del método de pago debe ser una cadena válida')
      .minLength(4, 'El nombre del método de pago debe tener al menos 4 caracteres')

    validator.field('description')
      .optional()
      .isString('La descripción del método de pago debe ser una cadena válida')

    validator.field('abbreviation')
      .optional()
      .isString('La abreviatura del método de pago debe ser una cadena válida')
      .minLength(2, 'La abreviatura del método de pago debe tener al menos 2 caracteres')

    const errors = validator.validate()

    if (Object.keys(errors).length > 0) return [errors, undefined]

    return [undefined, new UpdatePaymentMethodDto(id, nameMethod, description, abbreviation)]
  }
}
