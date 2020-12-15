import React, { useState, useEffect } from 'react'
import Product from '../components/Product'
import { Row, Col } from 'react-bootstrap'

const Home = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    //whatever we put here it's going to load as soon as the component loads
    const fetchProducts = async () => {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data)
    }
    fetchProducts()
  }, [])

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Home
