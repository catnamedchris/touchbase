require.config({
  paths: {
    jquery: 'lib/vendor/jquery-2.0.0'
  , underscore: 'lib/vendor/underscore'
  , backbone: 'lib/vendor/backbone'
  , text: 'lib/vendor/require/text'
  }
, shim: {
    'underscore': { exports: '_' }
  , 'backbone': {
      deps: [ 'underscore', 'jquery' ]
    , exports: 'Backbone'
    }
  , 'app': {
      deps: [ 'backbone' ]
    }
  }
});

require([ 'app' ], function( App ) {
  var app = new App();
  app.init();
});
