import CustomValidator from '../../validators/custom.validator'

interface IRegisterUserDto {
  username: string
  email: string
  password: string
}

export class RegisterUserDto {
  private constructor (
    public readonly username: string,
    public readonly email: string,
    public readonly password: string

  ) {}

  static create (object: { [key: string]: any }): [Object?, RegisterUserDto?] {
    const { username, email, password } = object

    const validator = new CustomValidator<IRegisterUserDto>({ username, email, password })

    validator.field('username').required().isString().minLength(6)
    validator.field('email').required().isString().email()
    validator.field('password').required().isString().minLength(12)

    const errors = validator.validate()

    if (Object.keys(errors).length > 0) return [errors, undefined]

    return [undefined, new RegisterUserDto(username, email, password)]
  }
}
