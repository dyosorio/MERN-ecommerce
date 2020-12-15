//1. import express module
const express = require('express')
//5. import products.js
const products = require('./data/products')

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

//3. listen on a port
app.listen(5000, console.log('server running on port 5000'))
