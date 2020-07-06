// import modules
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');
const multer = require('multer');

//import routes
const sequelize = require('./utilities/database')

// app 
const app = express()

//set up and configuration
app.use(bodyParser.urlencoded({
    extended: false
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'secret-key',
    store: new SequelizeStore({
        db: sequelize
    }),
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    proxy: true // if you do SSL outside of node.
}));

//listen to port
sequelize.sync()
    .then(() => {
        app.listen(8080, () => {
            console.log('app started')

        });

    })
    .catch(err => {
        console.log(err)
    })