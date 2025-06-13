import PaymentMethodDatasource from '../../domain/datasources/payment-method.datasource'
import { CreatePaymentMethodDto } from '../../domain/dtos/payment-method/create-payment-method.dto'
import { UpdatePaymentMethodDto } from '../../domain/dtos/payment-method/update-payment-method.dto'
import { PaymentMethodEntity } from '../../domain/entities/payment-method.entity'
import PaymentMethodRepository from '../../domain/repositories/payment-method.repository'

export class PaymentMethodRepositoryImpl implements PaymentMethodRepository {
  constructor (
    private readonly paymentMethodDatasource: PaymentMethodDatasource
  ) {}

  async getAll (): Promise<PaymentMethodEntity[]> {
    return await this.paymentMethodDatasource.getAll()
  }

  async getById (id: string): Promise<PaymentMethodEntity> {
    return await this.paymentMethodDatasource.getById(id)
  }

  async create (paymentMethodDto: CreatePaymentMethodDto): Promise<PaymentMethodEntity> {
    return await this.paymentMethodDatasource.create(paymentMethodDto)
  }

  async updateById (id: string, paymentMethodDto: UpdatePaymentMethodDto): Promise<PaymentMethodEntity> {
    return await this.paymentMethodDatasource.updateById(id, paymentMethodDto)
  }

  async deleteById (id: string): Promise<PaymentMethodEntity> {
    return await this.paymentMethodDatasource.deleteById(id)
  }
}
