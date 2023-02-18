const router = require('express').Router();

const homeController = require('./controllers/homeController.js');
const authController = require('./controllers/authController.js');
const galleryController = require('./controllers/galleryController.js');

router.use(homeController);
router.use(authController);
router.use(galleryController);

router.all('*', (req, res) => {
    res.render('home/404');
});
//TODO: add routes

module.exports = router;