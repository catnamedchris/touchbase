
/*
 * GET home page.
 */

exports.index = function(req, res){
	if (!req.session.username){
  	res.render('index', { title: 'TouchBase' });
	}
	else {
		//user homepage
	}
};
