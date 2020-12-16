# MERN-ecommerce 🛒

1. React Set up and git initialize: generate boiler plate and push first commit

## Front end

2. create the header and footer components

3. create Home page and product listing
   - create Product component
4. Create Rating Component, import it to the Product component

   - Rating takes two props: value and text
   - import PropTypes to validate the prop types

5. Implement React router

   - npm i react-router-dom react-router-bootstrap
   - import BrowserRouter as Router and wrap the entire app return inside <Router></Router>
   - import Route to create routes to every page
   - create Product page component, import it to App.js
   - create a route for Home and another route for Product
   - We'll change the <a> and use <Link> to avoid the page to reload every time we click on a <a>. This is a SPA, no need to reload
   - Go to Products.js and import { Link } from react-router-dom. Link takes a to={} attribute instead of an href
   - Header.js we're not going to use <Link>, for this we're going to import { LinkContainer } from react-router-bootstrap which does the same as <Link>, it allows us to wrap bootstrap components.Header.js wrap the nav links inside the <NavContainer>.

6. ProductPage

   - import { Link } from react-router-dom
   - import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
   - import the rating component
   - use the high order array method .find() in products, so for each product you match the product id to the id that has been passed in the URL.

   💡 important:

   > The video tutorial suggests using prop.match to get the URL id, I use useParams instead.
   > In ProductPage I implemented useHistory on a 'go back' button, through an onClick event; instead of using Link to '/' which would always take you to the homepage instead of going back to the previous page.

## Serving and Fetch Data from Express

7. Serving products from the backend

   - we'll move the products.js file to the backend
   - create a folder in the root called backend
   - npm init a package.json in the root folder
   - npm i express (in the root folder)
   - in the backend folder create a file called server.js, this is going to be our entry point for the server
   - inside the backend folder, create a data folder and copy products.js from frontend/src. Then will create some routes to serve the products from the backend
     on the frontend we used import syntax which is ES modules
     on server.js we'll use common js (require) to import the express module
   - in the copied file data/products.js change the export default syntax from ES modules to the common js syntax: module.exports = products
   - create three app.get requests: '/', '/api/products', and '/api/products/:id'

8. Fetching products from React (video 12)
   - We'll fetch the products from our routs in the backend 'api/products'
   - Go to Homepage and add products as component level state. Products will be global state when we get into Redux
   - in Homepage useState [products, setProducts], delete the line that imports the products.js file from fronted
   - import { useEffect } to make a request to our backend
   - To avoid a CORS error, we'll add a proxy so our fetch request will be done from 'http://localhost:5000/api/products/3' instead of trying to fetch from localhost:3000
   - go to frontend/package.json and add the following line under the "name':
     "proxy" : "http://127.0.0.1:5000"
     server 5000 needs to be running for the fetch api to get the data
   - Do the same in the ProductPage to fetch the product/:id
     - lets get rid of import products from '../products'
     - lets get rid of `const product = products.find((p) => p.\_id === id)` because we're going to be fetching in from the backend
     - set a state [product, setProduct] = an empty object
     - now we can delete the frontend/products.js file
9. Nodemon and Concurrently setup
   - npm i -D nodemon concurrently (-D to install as dev dependencies because we only need those for development)
   - on scripts, under "start" add the following scripts:
     "server": "nodemon backend/server",
     "client": "npm start --prefix frontend"
     "dev": "concurrently \"npm run server\" \"npm run client\""
