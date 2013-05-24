module.exports = function( req, res ) {
  if ( !req.session.authenticated ) {
    res.render( 'index', { title: 'TouchBase' } );
  } else {
    //user homepage
    console.log( 'User authenticated...should route to home page' );
  }
};
