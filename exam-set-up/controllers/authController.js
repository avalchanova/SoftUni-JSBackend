const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddleware.js');
const { getErrorMessage } = require('../utils/errorUtils.js');
const authService = require('../services/authService.js');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        //check out the names of "email"/"password" from the html form 
        const token = await authService.login(email, password);
        res.cookie('auth', token);
        res.redirect('/');
    } catch (error) {
        return res.status(404).render('auth/login', { error: getErrorMessage(error) }); //not found username with this email or password
    }
});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const { username, email, password, repeatPassword } = req.body;
    //check out the HTML names of "email"/"password" from the HTML form - probably did set them myself
    try {
        await authService.register(username, email, password, repeatPassword);
        res.cookie('auth', token);
        res.redirect('/');
    } catch (error) {
        return res.status(400).render('auth/register', { error: getErrorMessage(error) });
    }
    //TODO: login automatically 


});
router.get('/logout', isAuth, (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});


module.exports = router;
