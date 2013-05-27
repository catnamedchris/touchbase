define([ 'text!js/templates/friend.html' ], function( template ) {
  template: _.template( template )
, initialize: function( options ) {
    this.render();
  }
, render: function() {
    this.$el.html( this.template( this.model.toJSON() ) );
    return this;
  }
});
