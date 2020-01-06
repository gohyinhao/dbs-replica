const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

router.get('/', (req, res) => res.render('home'));

router.get('/register', (req, res) => res.render('register'));

router.post('/register', (req, res) => {
    const newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, (error, user) => {
        if (error) {
            req.flash('error', error.message);
            return res.redirect('/register');
        }
        passport.authenticate('local')(req, res, () => {
            req.flash('success', `Welcome to DBS ${user.username}`);
            res.redirect('/');
        });
    });
});

router.get('/login', (req, res) => res.render('login'));

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
}));

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Successfully Logged Out!');
    res.redirect('/');
});

router.get('/locations', (req, res) => res.render('locations'));

module.exports = router;