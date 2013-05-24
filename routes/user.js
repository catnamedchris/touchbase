exports.validate = function( req, res, next ) {
  // TODO: Validate form data
  next();
};

exports.create = function( req, res ) {
  var mongoose = req.mongoose;
  var User = require( '../models/user' )( mongoose );
  var newUser = new User({
    username: req.body.username
  , email: req.body.email
  , password: req.body.password
  });

  newUser.save(function( err ) {
    mongoose.connection.close();
    if ( err ) res.send( 500, 'Unable to create new user' );
    else {
      req.session.authenticated = true;
      res.send( 200, {} );
    }
  });
};

exports.login = function( req, res ) {
  var mongoose = req.mongoose;
  var User = require( '../models/user' )(mongoose);
  User.find({ 'username': req.body.username }, function( err, docs ) {
    mongoose.connection.close();
    if (err) console.log( err );
    else {
      if ( docs.length === 0 ) {
        res.send( 403, { msg: 'User not available' });
      }
      else {
        if ( docs[0].password === req.body.password ) {
          res.send( 200, { msg: 'Start Session' } );
        }
        else {
          res.send( 403, { msg: 'Wrong password' } );
        }
      }
    }
  });
};
