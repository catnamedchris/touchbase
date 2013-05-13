exports.login = function(req, res){
	var mongoose = require('mongoose');
	mongoose.connect('mongodb://localhost/touchbase');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console,'connection error:'));
	db

}

