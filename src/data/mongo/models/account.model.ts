import mongoose from 'mongoose'

const accountSchema = new mongoose.Schema({
  cardNumber: {
    type: String,
    required: true,
    unique: true,
    length: 4
  },
  bankName: {
    type: String,
    required: true
  },
  holderName: {
    type: String,
    required: true
  }
},
{
  timestamps: true
}
)

export const AccountModel = mongoose.model('Account', accountSchema)
