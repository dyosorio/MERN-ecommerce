//step 1. import
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

//step 2.connect to DB
dotenv.config()

connectDB()

//step 3. import data, async because mongoose returns a promise
//step 3.1 clear all three collections out completely with deleteMany
//step 3.2 import the user
const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })
    await Product.insertMany(sampleProducts)

    console.log('Data imported')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

//step 4. destroy data
const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data destroyed')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

//import run: node backend/seeder
//destroy run: node backend/seeder -d
if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
