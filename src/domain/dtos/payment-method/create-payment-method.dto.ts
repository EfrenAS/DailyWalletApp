import CustomValidator from '../../validators/custom.validator'

export class CreatePaymentMethodDto {
  private constructor (
    public readonly nameMethod: string,
    public readonly description: string,
    public readonly abbreviation: string
  ) {}

  static create (object: { [key: string]: any }): [Object?, CreatePaymentMethodDto?] {
    const { nameMethod, description, abbreviation } = object

    const validator = new CustomValidator<CreatePaymentMethodDto>({ nameMethod, description, abbreviation })

    validator.field('nameMethod')
      .required('El nombre del método de pago es requerido')
      .isString('El nombre del método de pago debe ser una cadena válida')
      .minLength(4, 'El nombre del método de pago debe tener al menos 3 caracteres')

    validator.field('description')
      .optional()
      .isString('La descripción del método de pago debe ser una cadena válida')

    validator.field('abbreviation')
      .optional()
      .isString('La abreviatura del método de pago debe ser una cadena válida')
      .minLength(2, 'La abreviatura del método de pago debe tener al menos 2 caracteres')

    const errors = validator.validate()

    if (Object.keys(errors).length > 0) return [errors, undefined]

    return [undefined, new CreatePaymentMethodDto(nameMethod, description, abbreviation)]
  }
}
