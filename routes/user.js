var User = require( '../models/user' );

exports.validate = function( req, res, next ) {
  // TODO: Validate form data
  next();
};

exports.create = function( req, res ) {
  var newUser = new User({
    username: req.body.username
  , email: req.body.email
  , password: req.body.password
  });

  newUser.save(function( err, newUser ) {
    if ( err ) res.send( 500, 'Unable to create new user' );
    req.session.authenticated = true;
    req.session._id = newUser._id;
    res.send( 200, {} );
  });
};

exports.login = function( req, res ) {
  User.find({ 'username': req.body.username }, function( err, docs ) {
    if ( err ) console.log( err );
    if ( !docs.length ) {
      res.send( 403, { msg: 'User not available' } );
    } else if ( docs[0].password === req.body.password ) {
      req.session.authenticated = true;
      req.session._id = docs[0]._id;
      res.send( 200, { msg: 'Start Session' } );
    } else {
      res.send( 403, { msg: 'Wrong password' } );
    }
  });
};

exports.friends = function( req, res ) {
  User.findById( req.session._id ).populate({
    path: 'friends'
  , select: 'username'
  }).exec(function( err, user ) {
    if ( err ) res.send( 500, [] );
    res.send( 200, user.friends );
  });
};
