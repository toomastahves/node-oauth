'use strict';

var passport = require('passport');
var credentials = require('./credentials.json');

module.exports = function(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  require('./strategies/google.strategy')(credentials.google);
  require('./strategies/twitter.strategy')(credentials.twitter);
  require('./strategies/facebook.strategy')(credentials.facebook);
};
