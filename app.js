var express  = require( 'express' )
  , http     = require( 'http' )
  , path     = require( 'path' )
  , db       = require( './lib/db' )
  , routes   = require( './routes' )
  , user     = routes.user;

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'My secret'}));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get( '/', routes.index );
app.post( '/login', db.connect, user.validate, user.login );
app.post( '/user', db.connect, user.validate, user.create );

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
