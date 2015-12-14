'use strict';

var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

module.exports = function() {
  passport.use(new TwitterStrategy({
    consumerKey: 'vBUCeJBpPlNllDAOuWq3SxdVi',
    consumerSecret: '8TaSS4KE7pH0qnqta0gBL1rkpXaI0wRXAL2SMnh0LWYB1yjWOo',
    callbackURL: 'http://localhost:3000/auth/twitter/callback',
    passReqToCallback: true
  },
  function(req, token, tokenSecret, profile, done) {
    var user = {};

    user.image = profile._json.profile_image_url;
    user.displayName = profile.displayName;

    user.twitter = {};
    user.twitter.id = profile.id;
    user.twitter.token = token;

    done(null, user);
  }));
};