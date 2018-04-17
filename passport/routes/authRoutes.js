var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/login', (req, res) => {
  res.render('login', {user : req.user});
});

router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

router.get('/logout', (req, res) => {
  res.send('logging out');
});

router.get('/google/redirect', (req, res) => {
    res.send('you reached the redirect URI');
});
module.exports = router;
