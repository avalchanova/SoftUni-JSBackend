const router = require('express').Router();

const homeController = require('./controllers/homeController.js');
const authController = require('./controllers/authController.js');

router.use(homeController);
router.use(authController);
// there is no prefix in this case, check this out! if there is prefix in the exam, change it here as well

//TODO: add routes

module.exports = router;