module.exports = function( req, res ) {
  if ( !req.session.authenticated ) {
    res.render( 'index', { title: 'TouchBase' } );
  } else {
    var User = require( '../models/user' );
    User.findById(req.session._id, function( err, user ) {
      if ( err ) console.log( err );
      res.render('home', {
        title: 'TouchBase'
      , username: user.username
      , email: user.email
      , password: user.password
      });
    });
  }
};
