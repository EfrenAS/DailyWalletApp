import CustomValidator from '../../validators/custom.validator'

interface ILoginUserDto {
  email: string
  password: string
}

export class LoginUserDto {
  private constructor (
    public readonly email: string,
    public readonly password: string
  ) {}

  static create (object: { [key: string]: any }): [Object?, LoginUserDto?] {
    const { email, password } = object

    const validator = new CustomValidator<ILoginUserDto>({ email, password })

    validator.field('email').required().isString().email()
    validator.field('password').required().isString()

    const errors = validator.validate()

    if (Object.keys(errors).length > 0) return [errors, undefined]

    return [undefined, new LoginUserDto(email, password)]
  }
}
