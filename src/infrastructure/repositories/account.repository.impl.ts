import AccountDatasource from '../../domain/datasources/account.datasource'
import { CreateAccountDto } from '../../domain/dtos/account/create-account.dto'
import { UpdateAccountDto } from '../../domain/dtos/account/update-account.dto'
import { AccountEntity } from '../../domain/entities/account.entity'
import AccountRepository from '../../domain/repositories/account.repository'

export class AccountRepositoryImpl implements AccountRepository {
  constructor (
    private readonly accountDatasource: AccountDatasource
  ) {}

  async getAll (): Promise<AccountEntity[]> {
    return await this.accountDatasource.getAll()
  }

  async getById (id: string): Promise<AccountEntity> {
    return await this.accountDatasource.getById(id)
  }

  async create (accountDto: CreateAccountDto): Promise<AccountEntity> {
    return await this.accountDatasource.create(accountDto)
  }

  async updated (id: string, accountDto: Partial<UpdateAccountDto>): Promise<AccountEntity> {
    return await this.accountDatasource.updated(id, accountDto)
  }

  async delete (id: string): Promise<AccountEntity> {
    return await this.accountDatasource.delete(id)
  }
}
