module.exports = function( mongoose ) {
  var UserSchema = mongoose.Schema({
    username: String
  , email: String
  , password: String
  });

  return mongoose.model( 'User', UserSchema );
};
