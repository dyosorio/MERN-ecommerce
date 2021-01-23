import express from 'express'
const router = express.Router()
import {
  getProducts,
  getProductById,
  getTopProducts,
} from '../controllers/productController.js'

router.route('/').get(getProducts)
router.get('/top', getTopProducts)
router.route('/:id').get(getProductById)

export default router
