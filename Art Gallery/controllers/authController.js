const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddleware.js');
const { getErrorMessage } = require('../utils/errorUtils.js');
const authService = require('../services/authService.js');

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const { username, password, repeatPassword, address } = req.body;
    // console.log(username, password, repeatPassword, address);

    //check out the HTML names of "email"/"password" from the HTML form - probably did set them myself
    try {
        const token = await authService.register(username, password, repeatPassword, address);
        res.cookie('auth', token);
        res.redirect('/');
    } catch (error) {
        return res.status(400).render('auth/register', { error: getErrorMessage(error) });

    }
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        //check out the names of "email"/"password" from the html form 
        const token = await authService.login(username, password);
        res.cookie('auth', token);
        res.redirect('/');
    } catch (error) {
        return res.status(404).render('auth/login', { error: getErrorMessage(error) }); //not found username with this email or password
    }
});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});


module.exports = router;
