import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'

//init dotenv
dotenv.config()

//connect to database
connectDB()

//init express with the variable called app
const app = express()

//user auth parser, allows to accept json data in the req.body
app.use(express.json())

//get request
app.get('/', (req, res) => {
  res.send('API is running...')
})

//mount it, for anything that goes to '/api/products' it is going to be link to productRoutes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

//fallback for Not Found 404 errors
app.use(notFound)

//error middleware
app.use(errorHandler)

//bring the PORT # from the .env file
const PORT = process.env.PORT || 5000

//listen on a port
app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
