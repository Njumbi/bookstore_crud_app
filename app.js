// import modules
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');
const multer = require('multer');
const fs = require('fs');

// imports
const sequelize = require('./utilities/database')
const bookRoutes = require('./routes/books')
const userRoutes = require('./routes/users')
// create server
const app = express()

//set up
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + "-" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false)
    }
};
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(multer({
    storage: fileStorage,
    fileFilter: fileFilter
}).single("image"));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(session({
    secret: 'secret-key',
    store: new SequelizeStore({
        db: sequelize
    }),
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    proxy: true // if you do SSL outside of node.
}));

//use routes
app.use(bookRoutes)
app.use(userRoutes)

//listen to server
sequelize.sync()
    .then(() => {
        app.listen(8080, () => {
            console.log('app started')

        });

    })
    .catch(err => {
        console.log(err)
    })