const router = require('express').Router();

const homeController = require('./controllers/homeController.js');
const authController = require('./controllers/authController.js');
const cryptoController = require('./controllers/cryptoController.js');

router.use(homeController);
router.use(authController);
router.use('/crypto', cryptoController);
router.all('*', (req, res) => {
    res.render('home/404');
});
// router.all('*') --> means that if it went to all the other possible requests and nothing worked then the 404 function is now in motion
// there is no prefix in this case, check this out! if there is prefix in the exam, change it here as well

//TODO: add routes

module.exports = router;