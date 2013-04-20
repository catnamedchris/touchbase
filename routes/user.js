
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.signup = function(req, res) {
  //var mongoose = require('mongoose');
  //mongoose.connect('mongodb://localhost/touchbase');
  //var db = mongoose.connection;
  //db.on('error', console.error.bind(console, 'connection error:'));
  //db.once('open, function() {
    //var UserSchema = mongoose.Schema({
      //fName: String
    //, lName: String
    //, email: String
    //, password: String
    //});

    //var User = mongoose.model('User', UserSchema);


  //});
  res.render('new-user', {
    title: 'Welcome'
  , fName: req.body.fName
  , lName: req.body.lName
  , email: req.body.email
  , password: req.body.password
  });
};
