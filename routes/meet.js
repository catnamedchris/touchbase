var User = require( '../models/user' )
  , Meet = require( '../models/meet' )
  , Async = require( 'async' );

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

    var meetMembers = newMeet.who.invited;
    meetMembers.push( newMeet.host );

    Async.forEach(meetMembers, function( username, callback ) {
      User.findOneAndUpdate({ username: username }, {
        $push: { meets: newMeet._id }
      }, callback);
    }, function( err ) {
      if ( err ) res.send( 500, 'Unable to save meet.' );
      else res.send( 200, {} );
    });
  });
};

exports.delete = function( req, res ) {
  Meet.findByIdAndRemove(req.params.id, 'who', function( err, meet ) {
    if ( err )  res.send( 500, 'Unable to delete meet.' );

    var members = meet.who.attending.concat( meet.who.invited );

    Async.forEach(members, function( username, callback ) {
      User.findOneAndUpdate({ username: username }, {
        $pull: { meets: meet._id }
      }, callback);
    }, function( err ) {
      if ( err ) res.send( 500, 'Unable to delete meet.' );
      else res.send( 200, {} );
    });
  });
};

exports.put = function( req, res ) {
  Meet.findByIdAndUpdate(req.params.id, {
    who: req.body.who
  }, function( err, meet ) {
    if ( err ) res.send( 500, 'Unable to update attendees.' );
    res.send( 200, {});
  });
};

exports.meets = function( req, res ) {
  User.findOne({ username: req.session.uid }).populate({
    path: 'meets'
  , model: 'Meet'
  }).exec(function( err, user ) {
    if ( err ) res.send( 500, 'Unable to find user meets.' );
    res.send( 200, user.meets );
  });
};
