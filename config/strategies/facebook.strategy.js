'use strict';

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function() {
  passport.use(new FacebookStrategy({
    clientID: '1502194923435911',
    clientSecret: '12bf9210697d9b681ca93394fca6bccc',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    passReqToCallback: false
  },
  function(accessToken, refreshToken, profile, done) {
    var user = {};

    //user.email = profile.emails[0].value;
    user.displayName = profile.displayName;

    user.facebook = {};
    user.facebook.id = profile.id;
    user.facebook.token = accessToken;

    done(null, user);
  }));
};