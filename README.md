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
- to import: node backend/seeder
- to destroy: node backend/seeder -d
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

19. Custom error handling (video 24)

- to create a custom error handler, we'll have to add a custom middleware (a function that has access to the request response cycles)
- go to server.js and create an error middleware to pass a json message instead of html when getting 500 internal server error
- add a fallback for 404 errors
- in the backend, create a middleware folder
- create a file called errorMiddleware.js copy and paste the 404 and error middleware, export and import into server.js

## Redux

- in the frontend folder: npm i redux react-redux redux-thunk redux-devtools-extension
- in the src folder: create your redux store.js file
- go to index.js and import Provider from react-redux and wrap the <App /> in the Provider
- in the backend folder: npm run dev to run de backend

20. Reducers

- in the src folder create a folder named reducers. Each resource of our app will have a reducer file such as products
- productReducers.js will handle the product list
- in store.js import productListReducer and add that state to the combineReducers through a productList. Now, refresh the page and check the redux-devtools and you'll see the productList in the state tab

- in src create a new constant folder to store the switch cases strings
  - create a productConst and import it to productReducers
- in src create a folder called actions
- inside actions: create productActions.js

  > you'll start to notice this pattern: constant -> reducer -> action -> fire the action off in the component

  - in productActions import the productConstants

- Fire off the listProducts Action in the Home page:
  - in Home: clear out the useEffect
  - delete the products state. We don't need to set products as our local state anymore
  - import useDispatch and useSelector from react-redux
  - import listProducts from productActions
- create the Message and Loader components

- Product Detail Page:
  Fetch state, create product details reducer, create actions, get the data in the component with useSelector and fire it off with useDispatch
  - create details constants
  - go to productReducer and create the productDetailsReducer
  - add the productDetailsReducer to store.js
  - create the action, we want to make a request to /api/products/id
  - ProductPage: clear out the useEffect, import useDispatch and useSelector
  - Now the details are coming through the server, down to redux and to the state to print out on our frontend

## Adding the Shopping Cart

21. Qty select and Add to Cart Button

- Product page: Qty is going to be part of our component level state
- create a handler for the add to cart button
- create a cart page and import it to App.js to create route

22. Create cart reducer and add to cart action

- create the constants
- create the reducers
- create the cartActions

23. add to cart functionality

24. Remove items from cart

- cart remove constant
- card reducer: bring in the constant, add the cart remove case to the switch statement and return whatever we have in the state and the filtered out items, leaving the the removed items out.
- cartActions: bring in the cart remove item constant, dispatch the action to a reducer. Export removeFromCart
- CartScreen: import removeFromCart. Dispatch removeFromCart from removeFromCartHandler, passing the id

## Backend user authentication

25. Clean up by using Controllers:

- productRoutes cleanup: instead of having all the functionality directly in the route file, we'll have controllers that handle the functionality. Routes should just point to controller methods.
- create a controllers folder in the backend. Create a productController file. Create and export getProduct and getProductById functions
- productRoutes: import getProduct and getProductById. npm run server and Test in Postman

26. User Authentication Endpoint

- routes: create a file called userRoutes
- controllers: create a userControllers file. Create a authUser function
- Postman: create a new folder for users & Auth. Routes that have to do with managing users and authentication. Create a POST request to authenticate user and get token
- server.js: add middleware in order for the authentication req.body(with email and password) to parse. This req.body will go inside the authUser function.
- userRoute: import authUser from the userControllers file
- server.js: import the userRoute as we did with productRoutes

27. Authorization
    authentication: take an email and a password and authenticated against the database.
    authorization: having the user access certain protected routes in the API and we do that by sending the JSON web token. When we login is going to create and sign a JSON web token with a secret key, then that token get send back to the client and we can store it in the browser so when we have to access any protected routes we can send that token in the header. check http://jwt.io/

28. Generate a JSON web token

- npm i jsonwebtoken
- in the backend create a utils folder. In utils create a generateToken.js

29. Custom Authentication middleware (video 40)

- Crete a middleware to be able to take the generated token, once we logged in and use it to access a protected route.
- profile, create a new request: GET /api/users/profile. This will return logged in user
- userController: create the getUserProfile function
- userRoutes: import getUserProfile
- in the folder middleware, create a authMiddleware.js file. This middleware will validate the token
- userRoute: import the protect middleware
- authMiddleware: import expressAsyncHandler for handling any exceptions, wrap the entire protect function.

30. User Registration and Password Encryption

- we want to be able to create new users.
- Postman: create a POST/api/users request.
- userController: create and export a registerUser function.
- userRoute: import registerUser and create a router.route post request.
- userModel: add a middleware to encrypt the new users passwords previous saving. Note: a salt is a random string that makes the hash unpredictable.
  💡 important:

  > When we update soma data in a user profile, we don't want the bcrypt salt to run because it's going to crete a new hash and the user wouldn't be able to log in

## Frontend user authentication & profile

30. User Registration and Password Encryption. Video 43 (Login)

- step 1 - Frontend - src - constant: create the userConstant. Request, success, fail, and logout.
- step 2 - reducers: create the userReducers
- step 3 - store: import the userLoginReducer. In the reducer combineReducers, add a userLogin equals to userLoginReducer.
- step 4 - actions: we want a login action that's going to make the request to login and get the token.
- step 5 - store: add userLogin to the initialState.

Call the login action, pass the email and password in, make the request, and send down the state

31. User Login Screen Functionality

- screen: create LoginScreen.js. Import the Login action from userActions.
- components: create a FormContainer.js component
- LoginScreen: import the FormContainer
- App.js : create the login route to render the LoginScreen

> By this point we have the action, and the reducer that's going to send down the user info state.

- LoginScreen: define dispatch

32. Show User in Nav Bar & Logout (video 45)

- Now that we are logged in, we have our userInfo and state. Add the user name to the header and a dropdown with a link to the user profile, and a link to logout.
- components - header: import the userLogin state from redux.

💡 important:

> Remember to import useDispatch (to call in actions) and useSelector (to bring in in states) whenever you want to bring in anything from redux.

- Logout: create logout action in userActions, and import it to Header.js to dispatch it from the logoutHandler.

33. User Register Reducer, Action & Screen

- userConstants: create registerConstants.
- userReducers: create the userRegisterReducers.
- store: add the userRegisterReducer and add it to the reducer: combineReducers
- userActions: create a registerAction
- create registerScreen
- App.js : add the registerScreen to the routes

34. Update the profile Endpoint

- userController: create updateUserProfile
- userRoutes: import updateUserProfile

35. Profile Screen and Get User details:
    Get our profile data into redux to ultimately have a profile screen.

- constants:create the user details constants in userConstants to get the user details.
- userReducer: create userDetailsReducer
- store: add userDetailsReducer to reducer = combineReducers
- userActions: create an action to get the current user details. create getUserDetails action.
- screens: create a profileScreen. Import he getUserDetails action.
- App.js : add the profile Screen. Add the ProfileScreen route.

36. Update User Profile: give functionality to the User Profile form.

- constants: add user update constants.
- reducers: userUpdateProfileReducer
- store: import userUpdateProfile
- userActions: updateUserProfile
- ProfileScreens: import and dispatch the updateUserProfile action, from the submitHandler
