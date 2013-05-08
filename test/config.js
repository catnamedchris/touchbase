require.config({
  baseUrl: '../public/js/'
, paths: {
    jquery: 'lib/vendor/jquery-2.0.0'
  , underscore: 'lib/vendor/underscore'
  , backbone: 'lib/vendor/backbone'
  , text: 'lib/vendor/require/text'
  , chai: '../../node_modules/chai/chai'
  , mocha: '../../node_modules/mocha/mocha'
  }
, shim: {
    'underscore': { exports: '_' }
  , 'backbone': {
      deps: [ 'underscore', 'jquery' ]
    , exports: 'Backbone'
    }
  , 'chai': { exports: 'chai' }
  , 'mocha': { exports: 'mocha' }
  }
});

require([ '../../test/app.test' ], function( Tester ) {
  var tester = new Tester();
  tester.init();
  tester.run();
});
