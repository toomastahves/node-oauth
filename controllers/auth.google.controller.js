'use strict';
var User = require('../models/user.model');

function getUser(data) {
  var query = {'google.id': data.profile.id};
  User.findOne(query, function(error, user) {
    if(user) {
      console.log('Getting google user');
      data.done(null, user);
    } else {
      createUser(data, user);
    }
  });
}

function createUser(data, user) {
  console.log('Creating google user');
  user = new User();
  user.displayName = data.profile.displayName;
  user.email = data.profile.emails[0].value;
  user.image = data.profile._json.image.url;
  user.google = {};
  user.google.id = data.profile.id;
  user.google.token = data.token;
  user.save();
  data.done(null, user);
}

var GoogleController = {
  getUser: getUser,
  createUser: createUser
};

module.exports = GoogleController;