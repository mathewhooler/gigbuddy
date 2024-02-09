var express = require('express');
var router = express.Router();
const passport = require('passport');
const title = 'New Gig';

router.get('/', function(req, res, next) {
  res.redirect('/gigs');

});

router.get('/auth/google', passport.authenticate(
  'google',
  {
    scope: ['profile', 'email'],
  }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/gigs',
    failureRedirect: '/gigs'
  }
));

router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/gigs');
  });
});

module.exports = router;
