var User = require( '../models/user' )
  , Meet = require( '../models/meet' );

exports.create = function( req, res ) {
  var newMeet = new Meet({
    host: req.body.host
  , what: req.body.what
  , when: req.body.when
  , where: req.body.where
  , who: req.body.who
  });

  newMeet.save(function( err, newMeet ) {
    if ( err ) res.send( 500, 'Unable to create new meet.' );
    User.findOneAndUpdate({ username: req.body.host }, {
        $push: { meets: newMeet._id }
    }, function( err, user ) {
      if ( err ) res.send( 500, 'Unable to save meet to host.' );
      res.send( 200, {} );
    });
  });
};

exports.attendingMeets = function( req, res ) {
  User.findOne({ username: req.session.uid }).populate({
    path: 'meets'
  , model: 'Meet'
  }).exec(function( err, user ) {
    if ( err ) res.send( 500, 'Unable to find user meets.' );
    res.send( 200, user.meets );
  });
};
