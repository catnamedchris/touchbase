module.exports = function( req, res ) {
  if ( !req.session.authenticated ) {
    res.render( 'index', { title: 'TouchBase' } );
  } else {
    var User = require( '../models/user' );
    User.findOne({ username: req.session.uid }, function( err, user ) {
      if ( err ) console.log( err );
      res.cookie( 'username', user.username, { maxAge: 900000 } );
      res.render( 'home', { title: 'TouchBase' } );
    });
  }
};
