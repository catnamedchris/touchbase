var mongoose = require( 'mongoose' )
  , Schema = mongoose.Schema;

var UserSchema = Schema({
  username: String
, email: String
, password: String
, meets: { type: [Schema.ObjectId] }
, friends: { type: [Schema.ObjectId] }
, friendRequests: {
    received: { type: [Schema.ObjectId] }
  , sent: { type: [Schema.ObjectId] }
  }
});
var User = mongoose.model( 'User', UserSchema );

module.exports = User;
