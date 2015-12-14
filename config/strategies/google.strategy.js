'use strict';

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function() {
  passport.use(new GoogleStrategy({
    clientID: '263254281554-ceo5a7othqrtgpp2k32nabbqopqrrvpa.apps.googleusercontent.com',
    clientSecret: 'k8a3w0CkN2mnWmKHGu699CQK',
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
    function(accessToken, refreshToken, profile, done) {
      var user = {};

      user.email = profile.emails[0].value;
      user.image = profile._json.image.url;
      user.displayName = profile.displayName;

      user.google = {};
      user.google.id = profile.id;
      user.google.token = accessToken;

      done(null, user);
    }
  ));
};