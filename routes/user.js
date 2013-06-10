var User = require( '../models/user' );

exports.validate = function( req, res, next ) {
  var requirejs = require( 'requirejs' );
  requirejs.config({
    baseUrl: __dirname + '/../'
  , nodeRequire: require
  });

  requirejs([ 'public/js/lib/validator' ], function( Validator ) {
    var validator = new Validator();
    if ( req.path !== '/login' ) {
      validator.checkEmail( req.body.email );
    }
    validator.checkUsername( req.body.username );
    validator.checkPassword( req.body.password );
    if ( validator.hasErrors() ) {
      res.send( 403, validator.errors );
    } else {
      next();
    }
  });
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

exports.logout = function( req, res ) {
  req.session.destroy();
  res.render( 'index', { title: 'TouchBase' } );
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

exports.profile = function( req, res ) {
    User.findOne({username: req.params.username }, function( err, user ) {
      if ( err ) res.send( 500, {} );
      res.send( 200, user );
    });
};

exports.profilePage = function( req, res ) {

  User.findOne({username: req.params.username }, function( err, user ) {
    console.log(err);console.log(user);
    if ( err ) res.send( 404, 'Page Not Found' );
    if ( !user ) {
      res.send( 404, 'User Not found' );
    } else {
      user.title = 'TouchBase';

      res.render( 'userProfile', user );
    }
  });
};
