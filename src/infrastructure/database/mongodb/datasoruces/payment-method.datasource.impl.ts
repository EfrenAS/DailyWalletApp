import { PaymentMethodModel } from '../../../../data/mongo/models/payment-method.model'
import PaymentMethodDatasource from '../../../../domain/datasources/payment-method.datasource'
import { CreatePaymentMethodDto } from '../../../../domain/dtos/payment-method/create-payment-method.dto'
import { UpdatePaymentMethodDto } from '../../../../domain/dtos/payment-method/update-payment-method.dto'
import { PaymentMethodEntity } from '../../../../domain/entities/payment-method.entity'
import MongoError from '../../../../domain/errors/mongo.error'
import { PaymentMethodError } from '../../../../domain/errors/payment-method.error'

export class PaymentMethodDatasourceImpl implements PaymentMethodDatasource {
  async getAll (): Promise<PaymentMethodEntity[]> {
    const paymentMethods = await PaymentMethodModel.find()
    return paymentMethods.map(paymentMethod => PaymentMethodEntity.fromObject(paymentMethod))
  }

  async getById (id: string): Promise<PaymentMethodEntity> {
    const paymentMethod = await PaymentMethodModel.findById(id)

    if (paymentMethod === null) throw PaymentMethodError.paymentMethodNotFound(`Payment method id: ${id} not found.`)

    return PaymentMethodEntity.fromObject(paymentMethod)
  }

  async create (paymentMethodDto: CreatePaymentMethodDto): Promise<PaymentMethodEntity> {
    const isPaymentMethodExist = await PaymentMethodModel.findOne({ nameMethod: paymentMethodDto.nameMethod })

    if (isPaymentMethodExist !== null) throw PaymentMethodError.paymentMethodExist(`These payment method ${paymentMethodDto.nameMethod} already exists.`)

    try {
      const newPaymentMethod = new PaymentMethodModel(paymentMethodDto)

      await newPaymentMethod.save()

      return PaymentMethodEntity.fromObject(newPaymentMethod)
    } catch (error) {
      console.log(error)
      throw MongoError.unknownError('There was an unknown error when trying to create the payment method.')
    }
  }

  async updateById (id: string, paymentMethodDto: UpdatePaymentMethodDto): Promise<PaymentMethodEntity> {
    const isPaymentMethodExist = await PaymentMethodModel.findOne({ nameMethod: paymentMethodDto.nameMethod })

    if (isPaymentMethodExist !== null) throw PaymentMethodError.paymentMethodExist(`These payment method ${paymentMethodDto.nameMethod!} already exists.`)

    const updatedPaymentMethod = await PaymentMethodModel.findByIdAndUpdate(id, paymentMethodDto, { new: true })

    if (!updatedPaymentMethod) throw PaymentMethodError.paymentMethodNotFound(`Payment method id: ${id} not found.`)

    return PaymentMethodEntity.fromObject(updatedPaymentMethod)
  }

  async deleteById (id: string): Promise<PaymentMethodEntity> {
    const paymentMethod = await PaymentMethodModel.findByIdAndDelete(id)

    if (paymentMethod === null) throw PaymentMethodError.paymentMethodNotFound(`Payment method id: ${id} not found.`)

    return PaymentMethodEntity.fromObject(paymentMethod)
  }
}
