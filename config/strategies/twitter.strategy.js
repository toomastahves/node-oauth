'use strict';

var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../../models/userModel');

var findUser = function(req, token, tokenSecret, profile, done) {
  var query = {
    'twitter.id': profile.id
  };
  User.findOne(query, function(error, user) {
    if(user) {
      console.log('user found');
      done(null, user);
    } else {
      console.log('user not found');
      user = new User();
      user.image = profile._json.profile_image_url;
      user.displayName = profile.displayName;

      user.twitter = {};
      user.twitter.id = profile.id;
      user.twitter.token = token;

      user.save();
      done(null, user);
    }
  });
};

function useStrategy(credentials) {
  var strat = new TwitterStrategy(credentials, findUser);
  passport.use(strat);
}

module.exports = useStrategy;