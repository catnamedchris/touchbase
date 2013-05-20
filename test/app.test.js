define([
  'jquery'
, 'underscore'
, 'backbone'
, 'chai'
, 'mocha'
, 'sinon'
, 'sinonChai'
], function( $, _, Backbone, chai, mocha, sinon, sinonChai ) {
  var Tester = function() {
    var assert, expect, should;

    this.init = function() {
      assert = chai.assert;
      expect = chai.expect;
      should = chai.should();
      chai.use( sinonChai );

      mocha.setup({ ui: 'bdd' });

      return this;
    };

    this.run = function() {
      var specs = [];
      specs.push( '../test/models/auth/login.test' );
      specs.push( '../test/models/auth/signup.test' );
      specs.push( '../test/views/auth/login.test' );
      specs.push( '../test/views/auth/signup.test' );

      require(specs, function() {
        $(function() {
          mocha.run();
        });
      });

    };
  };

  return Tester;
});
