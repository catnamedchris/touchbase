require.config({
  baseUrl: '../'
, paths: {
    jquery: 'js/lib/vendor/jquery-2.0.0'
  , underscore: 'js/lib/vendor/underscore'
  , backbone: 'js/lib/vendor/backbone'
  , text: 'js/lib/vendor/require/text'
  , socketio: 'js/lib/vendor/socket.io'
  }
, shim: {
    'underscore': { exports: '_' }
  , 'backbone': {
      deps: [ 'underscore', 'jquery' ]
    , exports: 'Backbone'
    }
  , 'socketio': { exports: 'io' }
  , 'js/app': {
      deps: [ 'backbone', 'socketio' ]
    }
  }
});

require([ 'js/app' ], function( App ) {
  var app = new App();
  app.init();
});
