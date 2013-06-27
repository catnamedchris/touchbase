var express  = require( 'express' )
  , http     = require( 'http' )
  , socket   = require( './lib/socket' )
  , path     = require( 'path' )
  , mongoose = require( 'mongoose' )
  , routes   = require( './routes' )
  , index    = routes.index
  , user     = routes.user
  , friend   = routes.friend
  , meet     = routes.meet;

var app = express();

app.configure(function() {
  app.set( 'port', process.env.PORT || 3000 );
  app.set( 'views', __dirname + '/views' );
  app.set( 'view engine', 'jade' );
  app.use( express.favicon() );
  app.use( express.cookieParser() );
  app.use( express.session( { secret: 'My secret' } ) );
  app.use( express.logger( 'dev' ) );
  app.use( express.bodyParser() );
  app.use( express.methodOverride() );
  app.use( app.router );
  app.use( express.static( path.join( __dirname, 'public' ) ) );
});

app.configure('development', function() {
  app.use( express.errorHandler() );
  mongoose.connect( 'mongodb://localhost/touchbase' );
});

app.configure('development-heroku', function() {
  app.use( express.errorHandler() );
  mongoose.connect( process.env.MONGOLAB_URI );
});

/*
 * Pages
 */
app.get( '/', index );
app.get( /^\/friends.*$/, index );
app.get( '/user/:username', index );
app.get( '/meet/new', index );

/*
 * API
 */
app.get( '/api/user/friends', user.friends );
app.get( '/api/user/:username', user.profile );
app.post( '/api/user', user.validate, user.create );
app.post( '/api/user/login', user.validate, user.login );

app.get( '/api/users/search', friend.find );

app.post( '/api/meet', meet.create );

app.get( '/api/meets/attending', meet.meetsAttending );


var server = http.createServer( app ).listen(app.get( 'port' ), function() {
  console.log( 'Express server listening on port ' + app.get( 'port' ) );
});
socket.listen( server );
