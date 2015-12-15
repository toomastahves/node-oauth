'use strict';

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../../models/user.model');
var GoogleController = require('../../controllers/auth.google.controller');

var userInfo = function(accessToken, refreshToken, profile, done) {

  var data = {
    profile: profile,
    token: accessToken,
    done: done
  };

  GoogleController.getUser(data);
};

function useStrategy(credentials) {
  var strat = new GoogleStrategy(credentials, userInfo);
  passport.use(strat);
}

module.exports = useStrategy;