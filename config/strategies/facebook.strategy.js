'use strict';

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../../models/user.model');
var FacebookController = require('../../controllers/auth.facebook.controller');

var userInfo = function(accessToken, refreshToken, profile, done) {

  var data = {
    profile: profile,
    token: accessToken,
    done: done
  };

  FacebookController.getUser(data);
};

function useStrategy(credentials) {
  var strat = new FacebookStrategy(credentials, userInfo);
  passport.use(strat);
}

module.exports = useStrategy;