'use strict';

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../../models/userModel');

var findUser = function(accessToken, refreshToken, profile, done) {
  var query = {
    'facebook.id': profile.id
  };
  User.findOne(query, function(error, user) {
    if(user) {
      console.log('user found');
      done(null, user);
    } else {
      console.log('user not found');
      user = new User();
      //user.email = profile.emails[0].value;
      user.displayName = profile.displayName;

      user.facebook = {};
      user.facebook.id = profile.id;
      user.facebook.token = accessToken;

      user.save();
      done(null, user);
    }
  });
};

function useStrategy(credentials) {
  var strat = new FacebookStrategy(credentials, findUser);
  passport.use(strat);
}

module.exports = useStrategy;