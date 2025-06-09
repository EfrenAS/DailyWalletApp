import { AccountModel } from '../../../../data/mongo/models/account.model'
import AccountDatasource from '../../../../domain/datasources/account.datasource'
import { CreateAccountDto } from '../../../../domain/dtos/account/create-account.dto'
import { UpdateAccountDto } from '../../../../domain/dtos/account/update-account.dto'
import { AccountEntity } from '../../../../domain/entities/account.entity'
import { AccountError } from '../../../../domain/errors/account.error'
import MongoError from '../../../../domain/errors/mongo.error'

export default class AccountDatasourceImpl implements AccountDatasource {
  public async getAll (): Promise<AccountEntity[]> {
    const accounts = await AccountModel.find()

    return accounts.map(account => AccountEntity.fromObject(account))
  }

  public async getById (id: string): Promise<AccountEntity> {
    const account = await AccountModel.findById(id)

    if (account === null) throw AccountError.accountNotFound(`Account ${id} not found or invalid id`)

    return AccountEntity.fromObject(account)
  }

  public async create (accountDto: CreateAccountDto): Promise<AccountEntity> {
    const isAccountExist = await AccountModel.findOne({ cardNumber: accountDto.cardNumber })

    if (isAccountExist !== null) throw AccountError.cardNumberExists(`These card number ${accountDto.cardNumber} already exists.`)

    try {
      const newAccount = new AccountModel(accountDto)

      await newAccount.save()

      return AccountEntity.fromObject(newAccount)
    } catch (error) {
      throw MongoError.unknownError('There was an unknown error when trying to create the account.')
    }
  }

  public async updated (id: string, accountDto: Partial<UpdateAccountDto>): Promise<AccountEntity> {
    const updatedAccount = await AccountModel.findByIdAndUpdate(id, accountDto, { new: true })

    if (!updatedAccount) throw AccountError.accountNotFound(`Account id: ${id} not found.`)

    return AccountEntity.fromObject(updatedAccount)
  }

  public async delete (id: string): Promise<AccountEntity> {
    const account = await AccountModel.findByIdAndDelete(id)

    if (account === null) throw AccountError.accountNotFound(`Account id: ${id} not found.`)

    return AccountEntity.fromObject(account)
  }
}
