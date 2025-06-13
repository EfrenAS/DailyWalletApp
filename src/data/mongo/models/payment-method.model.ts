import mongoose from 'mongoose'

const paymentMethodSchema = new mongoose.Schema({
  nameMethod: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  abbreviation: {
    type: String
  }
},
{
  timestamps: true
}
)

export const PaymentMethodModel = mongoose.model('PaymentMethod', paymentMethodSchema)
