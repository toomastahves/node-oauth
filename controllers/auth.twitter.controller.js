'use strict';
var User = require('../models/user.model');

function getUser(data) {
  var query = {'twitter.id': data.profile.id};
  User.findOne(query, function(error, user) {
    if(user) {
      console.log('Getting twitter user');
      data.done(null, user);
    } else {
      createUser(data, user);
    }
  });
}

function createUser(data, user) {
  console.log('Creating twitter user');
  user = new User();
  user.image = data.profile._json.profile_image_url;
  user.displayName = data.profile.displayName;
  user.twitter = {};
  user.twitter.id = data.profile.id;
  user.twitter.token = data.token;
  user.twitter.tokenSecret = data.tokenSecret;
  user.save();
  data.done(null, user);
}

var TwitterController = {
  getUser: getUser,
  createUser: createUser
};

module.exports = TwitterController;