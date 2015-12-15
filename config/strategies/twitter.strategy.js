'use strict';

var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../../models/user.model');
var TwitterController = require('../../controllers/auth.twitter.controller');

var userInfo = function(req, token, tokenSecret, profile, done) {

  var data = {
    profile: profile,
    token: token,
    tokenSecret: tokenSecret,
    done: done
  };

  TwitterController.getUser(data);
};

function useStrategy(credentials) {
  var strat = new TwitterStrategy(credentials, userInfo);
  passport.use(strat);
}

module.exports = useStrategy;