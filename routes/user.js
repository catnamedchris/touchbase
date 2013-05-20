exports.create = function( req, res ) {
  var mongoose = require( 'mongoose' );
  mongoose.connect( 'mongodb://localhost/touchbase' );
  var db = mongoose.connection;
  db.on( 'error', function() {
    console.error.bind(console, 'connection error:');
  });
  db.once('open', function() {
    var UserSchema = mongoose.Schema({
      username: String
    , email: String
    , password: String
    });
    var User = mongoose.model( 'User', UserSchema );
    var userData = {
      username: req.body.username
    , email: req.body.email
    , password: req.body.password
    };
    var newUser = new User( userData );
    newUser.save(function( err ) {
      mongoose.connection.close();
      if (err){
        console.log( err );
      }
      else{
        var pageData = userData;
        pageData.title = 'User page';
        res.send( 200, pageData );
      }
    });
  });
};
