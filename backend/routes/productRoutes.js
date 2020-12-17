//step 1. import express
import express from 'express'
//step 7. npm i and import express async handler
import asyncHandler from 'express-async-handler'
//step 2. set a variable to express.Router
const router = express.Router()
//step 5. import Product
import Product from '../models/productModel.js'

//This was cut out from server.js and paste into productRoutes.js
//step 4.  Fetch all products - GET /api/products - public route
router.get(
  '/',
  asyncHandler(async (req, res) => {
    //step 6
    const products = await Product.find({})
    res.json(products)
  })
)

//create a route to get a single product by its id
//step 4.  Fetch single products - GET /api/products/:id - public route
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    //step 8
    const product = await Product.findById(req.params.id)
    //make sure there is a product
    if (product) {
      res.json(product)
    } else {
      res.status(404)
      throw new Error('product not found')
    }
  })
)

//step 3. export default
export default router
