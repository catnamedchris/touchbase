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
    , params: {}
    , query: {}
    , session: {
        _id: '51a2a0d4b2619ba920000001'
      , authenticated: false
      }
    };
    res = { send: function() {} };
    spy = sinon.spy( res, 'send' );
  });

  describe('validate()', function() {
    afterEach(function( done ) {
      spy.reset();
      done();
    });

    it('should send an error if the email is invalid', function( done ) {
      User.validate( req, res );
      setTimeout(function() {
        spy.args[0][0].should.equal( 403 );
        spy.args[0][1].fields.email.should.equal( 'Email is invalid.' );
        done();
      }, 300);
    });

    it('should send an error if the username is invalid', function( done ) {
      req.body.username = '';
      User.validate( req, res );
      setTimeout(function() {
        spy.args[0][0].should.equal( 403 );
        spy.args[0][1].fields.username.should.equal( 'Username is invalid.' );
        req.body.username = 'username';
        done();
      }, 300);
    });

    it('should send an error if the password does not contain valid characters', function( done ) {
      User.validate( req, res );
      setTimeout(function() {
        spy.args[0][0].should.equal( 403 );
        spy.args[0][1].fields.password[0].should.equal( 'Password must contain at least one of the following: a letter, a digit, and a symbol.' );
        done();
      }, 300);
    });

    it('should send an error if the password does not contain at least 6 characters', function( done ) {
      req.body.password = 'p1!';
      User.validate( req, res );
      setTimeout(function() {
        spy.args[0][0].should.equal( 403 );
        spy.args[0][1].fields.password[0].should.equal( 'Password must contain at least 6 characters.' );
        req.body.password = 'password';
        done();
      }, 300);
    });

    it('should call next() if all data is valid', function( done ) {
      var nextSpy = sinon.spy();

      req.body.email = 'a@mailinator.com';
      req.body.password = 'password1!';
      User.validate( req, res, nextSpy );
      setTimeout(function() {
        nextSpy.should.have.been.called;
        req.body.email = 'email';
        req.body.password = 'password';
        done();
      }, 300);

    });
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

  describe('profile()', function() {
    it('should return a user\'s username, and email', function( done ) {
      req.params.username = 'Chris';
      User.profile( req, res );
      setTimeout(function() {
        spy.args[0][0].should.equal( 200 );
        spy.args[0][1].username.should.equal( 'Chris' );
        spy.args[0][1].email.should.equal( 'a@mailinator.com' );
        done();
      }, 300);
    });
  });
});

describe('Route :: New', function() {
  var req, res, spy;

  before(function() {
    req = { session: {} };
    res = { cookie: function() {}, render: function( page, data ) {} };
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
    User.findOne({ 'username': 'a' }, function( err, user ) {
      var cookieSpy = sinon.spy( res, 'cookie' );
      req.session.uid = user.username;
      require( '../routes/new' )( req, res );
      setTimeout(function() {
        spy.should.have.been.calledWith( 'home' );
        cookieSpy.should.have.been.calledWith( 'username', 'a', { maxAge: 900000 } );
        done();
      }, 300);
    });
  });
});

describe('Route :: Friend', function() {
  var req, res, spy;
  var User = require( '../routes/user' );

  before(function() {
    // Fake req, res objects
    req = {
      query: { name: 'Chris' }
    };
    res = { send: function() {} };
    spy = sinon.spy( res, 'send' );
  });

  describe('find()', function() {
    it('should return all usernames that are similar to the queried username', function( done ) {
      var Friend = require( '../routes/friend' );
      Friend.find( req, res );
      setTimeout(function() {
        spy.args[0][0].should.equal( 200 );
        spy.args[0][1][0].username.should.equal( 'Chris' );
        done();
      }, 300);
    });
  });
});
