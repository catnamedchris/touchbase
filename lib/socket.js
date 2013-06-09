var User = require( '../models/user' );

// TODO: Add unit test
exports.listen = function( server ) {
  var io = require( 'socket.io' ).listen( server );
  io.sockets.on('connection', function( socket ) {
    socket.on('request:addFriend', function( friendRequest ) {
      var requesteeId = friendRequest.requesteeId
        , requesterId = friendRequest.requesterId;

      User.findByIdAndUpdate(requesteeId, {
        $push: { 'friendRequests.received': requesterId }
      }).exec(function( err ) {
        if ( err ) {
          console.log( err );
        } else {
          User.findByIdAndUpdate(requesterId, {
            $push: { 'friendRequests.sent': requesteeId }
          }, function( err ) {
            if ( err ) {
              console.log( err );
            } else {
              socket.emit( 'processed:addFriend' );
            }
          });
        }
      });
    });
  });
};
