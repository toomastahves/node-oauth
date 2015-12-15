'use strict';
var User = require('../models/user.model');

function getUser(data) {
  var query = {'facebook.id': data.profile.id};
  User.findOne(query, function(error, user) {
    if(user) {
      console.log('Getting facebook user');
      data.done(null, user);
    } else {
      createUser(data, user);
    }
  });
}

function createUser(data, user) {
  console.log('Creating facebook user');
  console.log(data.accessToken);
  user = new User();
  user.image = data.profile._json.profile_image_url;
  user.displayName = data.profile.displayName;
  user.facebook = {};
  user.facebook.id = data.profile.id;
  user.facebook.token = data.token;
  user.save();
  data.done(null, user);
}

var FacebookController = {
  getUser: getUser,
  createUser: createUser
};

module.exports = FacebookController;