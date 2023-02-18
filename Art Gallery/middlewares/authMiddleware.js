const jwt = require('../lib/jsonwebtoken.js');
const { SECRET } = require('../constants.js');

exports.authentication = async (req, res, next) => {
    //is the user logged in?
    const token = req.cookies['auth'];
    if (token) {
        //user is logged
        try {
            const decodedToken = await jwt.verify(token, SECRET);
            req.user = decodedToken;
            res.locals.isAuthenticated = true;
            res.locals.user = decodedToken;
        } catch (err) {
            res.clearCookie('auth');
            res.status(401).render('home/404'); //unauthorized code
        }
    }

    next(); //if the user is not logged in then next()
};

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/');
    }
    next();
};