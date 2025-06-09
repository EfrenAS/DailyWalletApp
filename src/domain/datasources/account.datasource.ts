import { CreateAccountDto } from '../dtos/account/create-account.dto'
import { UpdateAccountDto } from '../dtos/account/update-account.dto'
import { AccountEntity } from '../entities/account.entity'

export default interface AccountDatasource {
  getAll: () => Promise<AccountEntity[]>
  getById: (id: string) => Promise<AccountEntity>
  create: (accountDto: CreateAccountDto) => Promise<AccountEntity>
  updated: (id: string, accountDto: Partial<UpdateAccountDto>) => Promise<AccountEntity>
  delete: (id: string) => Promise<AccountEntity>
}
