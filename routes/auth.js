var mongoose = require( 'mongoose' );

var UserSchema = mongoose.Schema({
      username: String 
    , email: String
    , password: String
    });

exports.login = function( req, res ) {
  mongoose.connect( 'mongodb://localhost/touchbase' );
  var db = mongoose.connection;
  db.on( 'error', console.error.bind(console, 'connection error:') );
  db.once('open', function(){
      var User = mongoose.model('User', UserSchema);
      User.find({ 'username': req.body.username}, function(err, docs) {
        mongoose.connection.close();
        if (err) {console.log('err');console.log(err);}
        else {
          if (docs.length === 0){
              res.send(200,'User not available')
          }
          else{
            if (docs[0].password === req.body.password){
              res.send(200,'Start Session')
            }
            else{
              res.send(200, 'Wrong password')
            } 
          }
        }
      });
  });
};

