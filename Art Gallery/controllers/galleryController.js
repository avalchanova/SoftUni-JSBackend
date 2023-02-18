const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware.js');
const publicationService = require('../services/publicationService.js');
const authService = require('../services/authService.js');
const { getErrorMessage } = require('../utils/errorUtils.js');
const User = require('../models/User.js');
// const { paymentMethodsMap } = require('../constants.js');


router.get('/gallery', async (req, res) => {
    const publications = await publicationService.getAll();
    res.render('art/gallery', { publications });
});

router.get('/:publicationId/details', async (req, res) => {
    const publication = await publicationService.getOne(req.params.publicationId);
    //CAST ERROR DEALT WITH
    console.log(publication.author.toString());

    const authorId = publication.author.toString();

    const author = await User.findById(authorId);
    const name = author.username;

    const isAuthor = publication.author == req.user?._id; //if there isn't a user return undefined if there is return the id
    const isShared = publication.usersShared?.some(id => id == req.user?._id);
    res.render('art/details', { publication, isAuthor, isShared, name });
});


router.get('/create', isAuth, (req, res) => {
    res.render('art/create'); // because the create.hbs is in views/art/create.hbs
});

router.post('/create', isAuth, async (req, res) => {
    const publicationData = req.body;
    try {
        await publicationService.create(req.user._id, publicationData);
        //SAVE MY PUBLICATIONS
        // user.myPublications.push(publicationId);
        // return user.save();
    } catch (error) {
        return res.status(400).render('art/create', { error: getErrorMessage(error) });
    }
    res.redirect('/gallery');
});

router.get('/:publicationId/edit', isAuth, async (req, res) => {
    const publication = await publicationService.getOne(req.params.publicationId);
    res.render('art/edit', { publication });
});


router.post('/:publicationId/edit', isAuth, async (req, res) => {
    const publicationData = req.body;
    await publicationService.edit(req.params.publicationId, publicationData);
    res.redirect(`/${req.params.publicationId}/details`);
});

router.get('/:publicationId/share', isAuth, async (req, res) => {
    try {
        await publicationService.share(req.user._id, req.params.publicationId);

    } catch (error) {
        return res.redirect(400).render('404', { error: getErrorMessage(error) });
    }
    res.redirect("/");
});

router.get('/:publicationId/delete', isAuth, async (req, res) => {
    await publicationService.delete(req.params.publicationId);
    res.redirect('/gallery');
});

module.exports = router;








//!!! res.render('crypto/details')
//!!! res.redirect('/crypto/catalog)