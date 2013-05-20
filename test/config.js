require.config({
  baseUrl: '../public/'
, paths: {
    jquery: 'js/lib/vendor/jquery-2.0.0'
  , underscore: 'js/lib/vendor/underscore'
  , backbone: 'js/lib/vendor/backbone'
  , text: 'js/lib/vendor/require/text'
  , chai: '../node_modules/chai/chai'
  , mocha: '../node_modules/mocha/mocha'
  , sinon: '../test/lib/vendor/sinon-1.7.1'
  , sinonChai: '../node_modules/sinon-chai/lib/sinon-chai'
  }
, shim: {
    'underscore': { exports: '_' }
  , 'backbone': {
      deps: [ 'underscore', 'jquery' ]
    , exports: 'Backbone'
    }
  , 'chai': { exports: 'chai' }
  , 'mocha': { exports: 'mocha' }
  , 'sinon': { exports: 'sinon' }
  , 'sinonChai': { exports: 'sinonChai' }
  }
});

require([ '../test/app.test' ], function( Tester ) {
  var tester = new Tester();
  tester.init().run();
});
