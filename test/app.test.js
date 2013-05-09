define([
  'underscore'
, 'jquery'
, 'backbone'
, 'chai'
, 'mocha'
], function( _, $, Backbone, chai, mocha ) {
  var Tester = function() {
    var assert, expect, should;

    this.init = function() {
      assert = chai.assert;
      expect = chai.expect;
      should = chai.should();

      mocha.setup({ ui: 'bdd' });

      return this;
    };

    this.run = function() {
      var specs = [];
      specs.push('../../test/models/login.test');
      specs.push('../../test/models/signup.test');

      require(specs, function() {
        $(function() {
          mocha.run();
        });
      });

    };
  };

  return Tester;
});
