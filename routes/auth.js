exports.login = function( req, res ) {
  console.log(
    'Attempting to log in with email: "' + req.body.email
    + '" and password: "' + req.body.password + '"'
  );
  // TODO: Implement login authentication.
  console.log('Login successful.');
  res.send(200, {
    email: req.body.email
  , password: req.body.password
  });
};

// TODO: Implement form validation.
exports.signup = function( req, res ) {
  var mongoose = require( 'mongoose' );
  mongoose.connect( 'mongodb://localhost/touchbase' );
  var db = mongoose.connection;
  db.on( 'error', console.error.bind(console, 'connection error:') );
  db.once('open', function() {
    var UserSchema = mongoose.Schema({
      fName: String
    , lName: String
    , email: String
    , password: String
    });
    var User = mongoose.model( 'User', UserSchema );
    var userData = {
      fName: req.body.fName
    , lName: req.body.lName
    , email: req.body.email
    , password: req.body.password
    };
    var newUser = new User( userData );
    newUser.save(function( err ) {
      if ( err ) console.log( err );
      res.send( 200, userData );
    });
  });
};
