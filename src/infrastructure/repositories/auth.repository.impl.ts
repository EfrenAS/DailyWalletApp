import { AuthDatasource } from '../../domain/datasources/auth.datasource'
import { LoginResponseDto } from '../../domain/dtos/auth/login-response.dto'
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto'
import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto'
import { UserEntity } from '../../domain/entities/user.entity'
import { AuthRepository } from '../../domain/repositories/auth.repository'

export class AuthRepositoryImpl implements AuthRepository {
  constructor (
    private readonly authDatasource: AuthDatasource
  ) {}

  async register (userDto: RegisterUserDto): Promise<UserEntity> {
    return await this.authDatasource.register(userDto)
  }

  async login (userDto: LoginUserDto): Promise<LoginResponseDto> {
    return await this.authDatasource.login(userDto)
  }
}
