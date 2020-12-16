//1. import express module
import express from 'express'
//7.  import dotenv
import dotenv from 'dotenv'
//5. import products.js
import products from './data/products.js'

//8.  init dotenv
dotenv.config()

//2. init express with the variable called app
const app = express()

//4.  get request
app.get('/', (req, res) => {
  res.send('API is running...')
})

//4.  get request to serve the data from products.js
app.get('/api/products', (req, res) => {
  res.json(products)
})

//6. create a route to get a single product by its id
// math the requested param id with an id inside the products data
app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id)
  res.json(product)
})

//bring the PORT # from the .env file
const PORT = process.env.PORT || 5000

//3. listen on a port
app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
