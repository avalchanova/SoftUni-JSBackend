const router = require('express').Router();
const publicationService = require('../services/publicationService.js');

router.get('/', async (req, res) => {
    const publications = await publicationService.getAll();
    //console.log(publications);
    res.render('home', { publications }); //goes in the home folder and finds index.js
});

module.exports = router;