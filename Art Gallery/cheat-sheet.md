# Cheat Sheet
1. Initialize project - npm init --yes
 * npm i nodemon -D --> go in package.json and take care of "start": "nodemon index.js"
 * npm i express
 * add routes.js // Router()
 * add body parser
 * add static route
3. Add view engine: npm i express-handlebars 
 * register with express
 * add views folder 
 * add home template
 * add main layout
 * add partial template folder
4. Add home controller
 * add controller to routes
5. Connect database
 * set mongoose.set('strictQuery', false) in index.js
6. Authentication 
 * fix HTML links - methods, actions - deleted, paths
 * add authController.js
 * add register page
 * add login page
7. Add user model
8. Add auth service
9. Install bcrypt and cookie-parser and configure
10. Register user
 * validate repeatPassword
 * user bcrypt to hash password
11. Login user
 * check if email exists (or username)
 * check if pass is valid
12. Generate jwt token
 * npm i jsonwebtoken
 * use uti.promisify to use async
 * generate token with payload and SECRET
 * add token to cookie
13. Add authentication middleware
 * add decoded token to the request
 * use authentication middleware
14. Logout
15. Authorization middleware
16. Dynamic navigation
17. Error handling local
17. Add error notification to main layout
19. Login automatically after register
20. Parse error to mongoose errors