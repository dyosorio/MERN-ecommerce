import React, { useState, useEffect } from 'react'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import { useParams, useHistory } from 'react-router'
import Rating from '../components/Rating'

const ProductPage = () => {
  const { id } = useParams()
  const history = useHistory()
  const [product, setProduct] = useState({})

  function goBackHandle() {
    history.goBack()
  }

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`/api/products/${id}`)
      const data = await response.json()
      setProduct(data)
    }
    fetchProduct()
  }, [])

  return (
    <>
      <button onClick={goBackHandle} className='btn btn-light my-3'>
        Go Back
      </button>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flushed'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className='btn-block'
                  type='button'
                  disabled={product.countInStock === 0}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ProductPage
