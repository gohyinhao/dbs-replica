// ============================
// IMPORTS
// ============================
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const localStrategy = require('passport-local');
const app = express();

const User = require('./models/user');

// ============================
// SETUP
// ============================
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));

// ============================
// DATABASE
// ============================
// mongoose.connect('mongodb://localhost:27017/<localDB>', { useNewUrlParser: true });
mongoose.connect('mongodb+srv://admin:qSB1W8m0X1Yj8xoV@dbsreplicadb-a6tub.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
.then(() => {
  console.log('DB Connected!');
}).catch(error => {
  console.log('DATABASE ERROR:', error.message);
});

// ============================
// PASSPORT CONFIG
// ============================
app.use(require('express-session')({
  secret: 'Anything works for this string',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ============================
// ROUTES
// ============================
const indexRoutes = require('./routes/index');
app.use(indexRoutes);

// ============================
// START SERVER
// ============================
const port = process.env.PORT || 8000;
app.listen(port, () => console.log('Server has started'));
