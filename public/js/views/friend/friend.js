define([ 'text!js/templates/friend.html' ], function( template ) {
  var FriendView = Backbone.View.extend({
    tagName: 'li'
  , className: 'friend-item'
  , template: _.template( template )
  , events: {
      'click input[name=friend]': 'changeFriendSelection'
    }
  , initialize: function( options ) {
      this.Pubsub = options.Pubsub;
    }
  , render: function() {
      this.$el.html( this.template( this.model.toJSON() ) );
      return this;
    }
  , changeFriendSelection: function( evt ) {
      if ( $( evt.target ).prop( 'checked' ) ) {
        this.Pubsub.trigger( 'select:friend', this.model.get('username') );
      } else {
        this.Pubsub.trigger( 'deselect:friend', this.model.get('username') );
      }
    }
  });

  return FriendView;
});
