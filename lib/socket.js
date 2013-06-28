var User = require( '../models/user' );

// TODO: Add unit test
exports.listen = function( server ) {
  var io = require( 'socket.io' ).listen( server )
    , userSockets = {};

  io.configure(function() {
    io.set('transports', ['xhr-polling']);
    io.set('polling duration', 10);
  });

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

    socket.on('register', function( user ) {
      userSockets[ user.username ] = socket;
    });

    socket.on('request:meet', function( users ) {
      var invited = users.invited;
      for ( var i = 0; i < invited.length; i++ ) {
        if ( userSockets[ invited[i] ] ) {
          userSockets[ invited[i] ].emit( 'request-sent:meet' );
        }
      }
    });
  });
};
