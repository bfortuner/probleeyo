'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/probleeapp-dev'
  },

   facebook: {
    clientID:     process.env.FACEBOOK_ID_DEV || 'id',
    clientSecret: process.env.FACEBOOK_SECRET_DEV || 'secret',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/facebook/callback'
  },


  seedDB: true
};
