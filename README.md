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
   - Header.js we're not going to use <Link>, for this we're going to import { LinkContainer } from react-router-bootstrap which does the same as <Link>, it allows us to wrap bootstrap components.Header.js wrap the nav links inside the <NavContainer>
