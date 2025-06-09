import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    maxLength: 12
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  emailConfirmed: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: true,
    minLength: 12
  },
  role: {
    type: [String],
    default: ['USER'],
    enum: ['ADMIN', 'USER']
  }
},
{
  timestamps: true
}
)

export const UserModel = mongoose.model('User', userSchema)
