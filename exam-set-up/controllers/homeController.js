const router = require('express').Router();

router.get('/', (req, res) => {
    // console.log(req.user);
    res.render('home'); //goes in the home folder and finds index.js
});

module.exports = router;