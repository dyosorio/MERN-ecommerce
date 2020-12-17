//step 1. import express module
import express from 'express'
//step 7.  import dotenv
import dotenv from 'dotenv'
//step 11.optional npm package colors
import colors from 'colors'
//16. import middleware functions
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
//step 9. import from db.js
import connectDB from './config/db.js'
//step 5. get rid of this step after importing productRoutes
//import products from './data/products.js'
//step 12. import productRoutes
import productRoutes from './routes/productRoutes.js'

//step 8.  init dotenv
dotenv.config()

//step 10. connect to database
connectDB()

//step 2. init express with the variable called app
const app = express()

//step 4.  get request
app.get('/', (req, res) => {
  res.send('API is running...')
})

//step 13. mount it, for anything that goes to '/api/products' it is going to be link to productRoutes
app.use('/api/products', productRoutes)

//15. fallback for Not Found 404 errors
app.use(notFound)

//14. error middleware
app.use(errorHandler)

//bring the PORT # from the .env file
const PORT = process.env.PORT || 5000

//step 3. listen on a port
app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
