import { LoginResponseDto } from '../dtos/auth/login-response.dto'
import { LoginUserDto } from '../dtos/auth/login-user.dto'
import { RegisterUserDto } from '../dtos/auth/register-user.dto'
import { UserEntity } from '../entities/user.entity'

export interface AuthRepository {
  register: (userDto: RegisterUserDto) => Promise<UserEntity>
  login: (userDto: LoginUserDto) => Promise<LoginResponseDto>
}
