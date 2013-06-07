var User = require( '../models/user' );

exports.find = function( req, res ) {
  var name = new RegExp( req.query.name, 'i' );
  User.find({ username: name }, 'username', function( err, users ) {
    if ( err ) console.log( err );
    res.send( 200, users );
  });
};
