const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const routes = require('./routes.js');
const { authentication } = require('./middlewares/authMiddleware.js');

const app = express();

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));
app.set('view engine', 'hbs');

app.use('/static', express.static('public'));
//if the request starts with "/static" it will be redirected to the public folder 
//in public folder we will ad the crypto resources that we have to change during the real exam (подменяме css and images)
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authentication);
app.use(routes);

mongoose.set('strictQuery', false);
//!!!!TODO: change DB name (crypto)
mongoose.connect('mongodb://localhost:27017/crypto');



app.listen(3000, () => console.log('Server is listening on port 3000...'));