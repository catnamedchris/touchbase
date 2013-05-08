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
    };

    this.run = function() {
      describe('Model :: Login', function() {
        var loginModel;

        beforeEach(function( done ) {
          require([ 'models/auth/login' ], function( LoginModel ){
            loginModel = new LoginModel();
            console.dir(loginModel);
            done();
          });
        });

        describe('Creation', function() {
          it('should exist', function() {
            loginModel.should.exist;
          });

          it('should have the correct URL attribute', function() {
            loginModel.should.have.property('url').equal('/login');
          });
        });

        describe('Validation', function() {
          it('should return an error for invalid email', function() {
            var error = loginModel.validate( loginModel.attributes );
            error.should.exist;
          });
        });
      });

      mocha.run();
    };
  };

  return Tester;
});
