var chai = require( 'chai' )
  , sinon = require( 'sinon' )
  , sinonChai = require( 'sinon-chai' )
  , should = chai.should();

chai.use( sinonChai );

var mongoose = require( 'mongoose' );
mongoose.connect( 'mongodb://localhost/touchbase' );

describe('Route :: User', function() {
  var req, res, spy;
  var User = require( '../routes/user' );

  before(function() {
    // Fake req, res objects
    req = {
      body: {
        username: 'username'
      , email: 'email'
      , password: 'password'
      }
    , session: {
        _id: '51a2a0d4b2619ba920000001'
      , authenticated: false
      }
    };
    res = { send: function() {} };
    spy = sinon.spy( res, 'send' );
  });

  describe('validate()', function() {
    it('should send an error if the data is invalid');
    it('should call next() if the data is valid');
  });

  describe('create()', function() {
    before(function( done ) {
      User.create( req, res );
      // Use a timeout for now because I don't know how to check
      // the session variable upon model saving.
      setTimeout(function() {
        done();
      }, 300);
    });

    it('should set the authenticated session variable to true upon successful save', function() {
      req.session.authenticated.should.be.true;
    });

    it('should set the user _id session variable upon successful save', function() {
      req.session._id.should.exist;
    });
  });

  describe('login()', function() {
    afterEach(function( done ) {
      spy.reset();
      done();
    });

    it('should send 403 and relevant message if user is not available', function( done ) {
      req.body.username = 'non-existent user';
      User.login( req, res );
      setTimeout(function() {
        spy.should.have.been.calledWith( 403, { msg: 'User not available' } );
        done();
      }, 300);
    });

    it('should send 403 and relevant message if the password does not match', function( done ) {
      req.body.username = 'Chris';
      User.login( req, res );
      setTimeout(function() {
        spy.should.have.been.calledWith( 403, { msg: 'Wrong password' } );
        done();
      }, 300);
    });

    it('should send 200 if the login was successful', function( done ) {
      req.body.username = 'Chris';
      req.body.password = 'password1!';
      User.login( req, res );
      setTimeout(function() {
        spy.should.have.been.calledWith( 200, { msg: 'Start Session' } );
        done();
      }, 300);
    });
  });

  describe('friends()', function() {
    after(function( done ) {
      spy.reset();
      done();
    });

    it('should return an array of user objects', function( done ) {
      User.friends( req, res );
      setTimeout(function() {
        spy.args.should.have.deep.property('[0][1]').that.is.an('array');
        spy.args[0][1].forEach(function( friend ) {
          friend.username.should.exist;
        });
        done();
      }, 300);
    });
  });
});

describe('Route :: New', function() {
  var req, res, spy;

  before(function() {
    req = { session: {} };
    res = { render: function( page, data ) {} };
    spy = sinon.spy( res, 'render' );
  });

  afterEach(function( done ) {
    spy.reset();
    done();
  });

  it('should render the index page when no session is authenticated', function( done ) {
    req.session.authenticated = false;
    require( '../routes/new' )( req, res );
    setTimeout(function() {
      spy.should.have.been.calledWith( 'index' );
      done();
    }, 300);
  });

  it('should render the home page when a session is authenticated', function( done ) {
    req.session.authenticated = true;

    var User = require( '../models/user' );
    User.find({ 'username': 'a' }, function( err, docs ) {
      req.session._id = docs[0]._id;
      require( '../routes/new' )( req, res );
      setTimeout(function() {
        spy.should.have.been.calledWith( 'home' );
        done();
      }, 300);
    });
  });
});
