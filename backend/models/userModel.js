//1. import mongoose
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

//2. create a user schema
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

//4. create a model from the User schema
const User = mongoose.model('User', userSchema)

//5. export User
export default User
