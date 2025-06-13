import { CreatePaymentMethodDto } from '../dtos/payment-method/create-payment-method.dto'
import { UpdatePaymentMethodDto } from '../dtos/payment-method/update-payment-method.dto'
import { PaymentMethodEntity } from '../entities/payment-method.entity'

export default interface PaymentMethodRepository {
  getAll: () => Promise<PaymentMethodEntity[]>
  getById: (id: string) => Promise<PaymentMethodEntity>
  create: (paymentMethodDto: CreatePaymentMethodDto) => Promise<PaymentMethodEntity>
  updateById: (id: string, paymentMethodDto: UpdatePaymentMethodDto) => Promise<PaymentMethodEntity>
  deleteById: (id: string) => Promise<PaymentMethodEntity>
}
