require.config({
  paths: {
    jquery: 'lib/jquery-2.0.0'
  , underscore: 'lib/underscore'
  , backbone: 'lib/backbone'
  , text: 'lib/require/text'
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
});
