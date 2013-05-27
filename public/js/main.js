require.config({
  baseUrl: '../'
, paths: {
    jquery: 'js/lib/vendor/jquery-2.0.0'
  , underscore: 'js/lib/vendor/underscore'
  , backbone: 'js/lib/vendor/backbone'
  , text: 'js/lib/vendor/require/text'
  }
, shim: {
    'underscore': { exports: '_' }
  , 'backbone': {
      deps: [ 'underscore', 'jquery' ]
    , exports: 'Backbone'
    }
  , 'js/app': {
      deps: [ 'backbone' ]
    }
  }
});

require([ 'js/app' ], function( App ) {
  var app = new App();
  app.init();
});
