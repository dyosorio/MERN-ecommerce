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

//middleware to encrypt new users passwords
userSchema.pre('save', async function (next) {
  //if the password has not been modified, we just call next and move on to the rest of the functionality
  if (!this.isModified('password')) {
    next()
  }
  //else, if the password has been modified run the following:
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

//4. create a model from the User schema
const User = mongoose.model('User', userSchema)

//5. export User
export default User
