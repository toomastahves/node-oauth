'use strict';

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../../models/userModel');

var findUser = function(accessToken, refreshToken, profile, done) {
  var query = {
    'google.id': profile.id
  };
  User.findOne(query, function(error, user) {
    if(user) {
      console.log('user found');
      done(null, user);
    } else {
      console.log('user not found');
      user = new User();
      user.email = profile.emails[0].value;
      user.image = profile._json.image.url;
      user.displayName = profile.displayName;

      user.google = {};
      user.google.id = profile.id;
      user.google.token = accessToken;

      user.save();
      done(null, user);
    }
  });
};

function useStrategy(credentials) {
  var strat = new GoogleStrategy(credentials, findUser);
  passport.use(strat);
}

module.exports = useStrategy;