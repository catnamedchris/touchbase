exports.connect = function( req, res, next ) {
  var mongoose, db;

  mongoose = require( 'mongoose' );
  mongoose.connect( 'mongodb://localhost/touchbase' );
  db = mongoose.connection;
  db.on('error', function( err ) {
    console.log( 'Database connection error: ' + err );
  });
  db.once('open', function() {
    req.mongoose = mongoose;
    next();
  });
};
