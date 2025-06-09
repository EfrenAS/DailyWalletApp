import { bcrypAdapter } from '../../../../config/bcrypt.adapter'
import { jwtAdapter } from '../../../../config/jwt,adapter'
import { UserModel } from '../../../../data/mongo/models/user.model'
import { AuthDatasource } from '../../../../domain/datasources/auth.datasource'
import { LoginResponseDto } from '../../../../domain/dtos/auth/login-response.dto'
import { LoginUserDto } from '../../../../domain/dtos/auth/login-user.dto'
import { RegisterUserDto } from '../../../../domain/dtos/auth/register-user.dto'
import { UserEntity } from '../../../../domain/entities/user.entity'
import AuthError from '../../../../domain/errors/auth.error'
import MongoError from '../../../../domain/errors/mongo.error'

export default class AuthDatasourceImpl implements AuthDatasource {
  async register (userDto: RegisterUserDto): Promise<UserEntity> {
    const isUserExist = await UserModel.findOne({ email: userDto.email })

    if (isUserExist != null) throw AuthError.emailExists(`Email ${userDto.email} already exists.`)

    try {
      const newUser = new UserModel(userDto)

      newUser.password = bcrypAdapter.hash(userDto.password)

      await newUser.save()

      return UserEntity.fromObject(newUser)
    } catch (error) {
      throw MongoError.unknownError('An unknown error occurred')
    }
  }

  async login (userDto: LoginUserDto): Promise<LoginResponseDto> {
    const user = await UserModel.findOne({ email: userDto.email })

    if (user === null) throw AuthError.userNotFound(`Email ${userDto.email} not found or invalid email`)

    if (!bcrypAdapter.compare(userDto.password, user.password)) throw AuthError.invalidPassword('Invalid password. Try Again.')

    const { password, emailConfirmed, createdAt, updatedAt, ...userEntity } = UserEntity.fromObject(user)
    const token = await jwtAdapter.generateToken({ id: user.id })

    if (typeof token !== 'string') throw AuthError.invalidToken('Invalid token')

    return {
      user: userEntity,
      token
    }
  }
}
