const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware.js');
//thanks to isAuth we will allow only user that are logged in
const cryptoService = require('../services/cryptoService.js');
const { getErrorMessage } = require('../utils/errorUtils.js');
const { paymentMethodsMap } = require('../constants.js');


router.get('/catalog', async (req, res) => {
    const crypto = await cryptoService.getAll();
    //we get all the crypto offers from DB
    res.render('crypto/catalog', { crypto });
    //we desplay them in the crypto/catalog page 
});

router.get('/search', async (req, res) => {
    const { name, paymentMethod } = req.query; // req.query because it is a GET request  
    // console.log(name);
    const crypto = await cryptoService.search(name, paymentMethod);
    res.render('crypto/search', { crypto });
});

router.get('/:cryptoId/details', async (req, res) => {
    const crypto = await cryptoService.getOne(req.params.cryptoId);
    const isOwner = crypto.owner == req.user?._id; //if there isn't a user return undefined if there is return the id
    //or --> const isOwner = crypto.owner.toString() === req.user?._id; //if there isn't a user return undefined if there is return the id
    //this is not business logic it is view data, so it is okay to be here

    const isBuyer = crypto.buyers?.some(id => id == req.user?._id);
    res.render('crypto/details', { crypto, isOwner, isBuyer });
    //the second param  { crypto, isOwner } is actually how we give data to the view we are rendering, lection Express and Handlebars
    //which means that the hbs file will use the isOwner, isBuyer (as with isAuthenticated) to validate users, etc.
});

router.get('/:cryptoId/buy', isAuth, async (req, res) => {
    await cryptoService.buy(req.user._id, req.params.cryptoId);
    res.redirect(`/crypto/${req.params.cryptoId}/details`);
});

router.get('/create', isAuth, (req, res) => {
    // create page is only for User --> isAuth
    res.render('crypto/create');
});

router.post('/create', isAuth, async (req, res) => {
    //this function sends the crypto offer to MongoDB
    const cryptoData = req.body;
    try {
        await cryptoService.create(req.user._id, cryptoData);
        //req.user._id --> the ID of the user that creates the crypto offer

    } catch (error) {
        return res.status(400).render('crypto/create', { error: getErrorMessage(error) });
    }
    res.redirect('/crypto/catalog');
});

router.get('/:cryptoId/edit', isAuth, async (req, res) => {
    const crypto = await cryptoService.getOne(req.params.cryptoId);
    const paymentMethods = Object.keys(paymentMethodsMap).map(key => ({
        value: key,
        label: paymentMethodsMap[key],
        isSelected: crypto.paymentMethod == key,
    }));
    res.render('crypto/edit', { crypto, paymentMethods });
    //because of the second param in the render func we can access the crypto info in the hbs file, e.g {{crypto.name}}, etc.
});
router.post('/:cryptoId/edit', isAuth, async (req, res) => {
    //console.log({ crypttto: req.body, idddd: req.params });
    const cryptoData = req.body;
    await cryptoService.edit(req.params.cryptoId, cryptoData);
    res.redirect(`/crypto/${req.params.cryptoId}/details`);
});

router.get('/:cryptoId/delete', isAuth, async (req, res) => {
    await cryptoService.delete(req.params.cryptoId);
    res.redirect('/crypto/catalog');
});

module.exports = router;








//!!! res.render('crypto/details')
//!!! res.redirect('/crypto/catalog)