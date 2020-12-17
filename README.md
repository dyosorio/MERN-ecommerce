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
   - Do the same in the ProductPage to fetch the product/:id - lets get rid of import products from '../products' - lets get rid of `const product = products.find((p) => p.\_id === id)` because we're going to be fetching in from the backend - set a state [product, setProduct] = an empty object - now we can delete the frontend/products.js file
     💡 important:

   > I used the fetch API instead of the axios library

9. Nodemon and Concurrently setup
   - npm i -D nodemon concurrently (-D to install as dev dependencies because we only need those for development)
   - on scripts, under "start" add the following scripts:
     "server": "nodemon backend/server",
     "client": "npm start --prefix frontend"
     "dev": "concurrently \"npm run server\" \"npm run client\""
     use npm run dev as is will run both node and react
10. Environment variables

- We're going to use the dotenv package: npm i dotenv
- go to server.js
- in the root create the .env file, this is where we can define any env variables
- make sure the .env file is added to .gitignore

11. Convert the server common js syntax(require / module.exports) in Node to ES module syntax(import / export default) - video 15

- add a type module in the root package.json. Under "main" : "server.js"
  // package.json
  {
  "type": "module"
  }
- change the syntax. Make sure you .js to the file names when importing files in the backend
- change back export syntax in data/products.js

## MongoDB

12. MongoDB Atlas & Compass setup (video 16)

- signing to MongoDB Atlas
- create a new project
- create a new Cluster
- go to Security, Database access and add new user that can read and write to any database
- under network access add ip address
- Clusters, Collections, add my own data. Add a Database name and a collection name of products
- Clusters, Connect, click on Connect using MongoDB Compass. Click on I have MongoDB Compass and Copy the connection string
- open Compass, paste the connection string
  mongodb+srv://DannyAdmin:<password>@mernecommerce.lynsg.mongodb.net/test
  Change test to the name of the database, add the password and connect
- On Atlas, Cluster, Connect, Connect your application. Copy the connection string and put inside a variable on the .env file

13. Connecting to the Database

- we're going to use Moongose. Which is object modeling for Nodejs. It allows us to create a model and a schema for different resources on our database (products, users, etc)
- npm i mongoose in the root folder
- in backend create a folder called config, create a file called db.js
- in db.js import mongoose and connect to the db using the MONGO_URI connection string we saved in .env
- import db.js to server.js. Remember to add .js when importing in the backend
- npm i colors, optional package to add style to the db.js console messages
  remember npm run server to run the backend only

14. Modeling our Data (video 19):

- In the backend, create a folder called models
- we're going to have three models: users, products and orders
- userModel.js : import mongoose, create schema, create a model named 'User' from the schema userSchema.Export default User
- productModel: add a user field to the productSchema, because we want to know which Admin created which product, so we need to have an object id. Reference the model 'User' to this object id, with this we created a relationship between the product and the user. In the same Model add a reviewSchema to be used as reviews in the productSchema
- orderModel: we need a user connected to the order,

15. Prepared some data to be imported into our database

- in the data/products.js file, get rid of all the \_id, because when data is enter into mongoDB this automatically creates a \_id field
- inside data create a file called users.js, add an array with three users.
- npm i bcryptjs // to encrypt the password. Import bcrypt into users.js

16. Data seeder

- create a data base seeder so we can import some sample data
- in the backend folder create seeder.js.
- import mongoose and dotenv, because we need the MONGO_URI, import users and products from data
- import all three models, import connectDB and connect
- create an importData function and a destroyData function
- to import: node backend/seeder **DIDN'T UNDERSTAND THIS**
- to destroy: node backend/seeder -d **DIDN'T UNDERSTAND THIS**
- add scripts to json.package
- open MongoDB Compass

17. Fetching products from the database (video 22)

- start to fetch products from the database
- in the backend folder, create a folder called routes
- create productRoutes.js, set up express
- cut the /products and /products/:id routes from server.js and past it in productRoutes.js
- import productRoutes into server.js
- in server.js link '/api/products' with productRoutes
- in productRoutes import the productModel
- handle errors with npm i express-async-handler

18. Getting started with Postman

- In Postman, create a new collection for our API. This will be the shopping cart API
- Add a folder for Products, for all routes that has to do with products
  - add request for GET/api/products
  - add an environment variable for the URL, with init value of http://localhost:5000. Now the get url in postman will be this {{URL}}/api/products, notice the env variable is wrap in double {}
  - add request for GET/api/products/:id
