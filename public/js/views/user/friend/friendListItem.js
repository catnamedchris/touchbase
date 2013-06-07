define([
  'text!js/templates/user/friend/friendListItem.html'
], function( friendListItemTemplate ) {
  var FriendListItemView = Backbone.View.extend({
    tagName: 'li'
  , className: 'friend-item'
  , template: _.template( friendListItemTemplate )
  , events: {
      'click input[name=friend]': 'changeFriendSelection'
    }
  , initialize: function( options ) {
      this.App = options.App;
    }
  , render: function() {
      this.$el.html( this.template( this.model.toJSON() ) );
      return this;
    }
  , changeFriendSelection: function( evt ) {
      if ( $( evt.target ).prop( 'checked' ) ) {
        this.App.Pubsub.trigger( 'select:friend', this.model.get('username') );
      } else {
        this.App.Pubsub.trigger( 'deselect:friend', this.model.get('username') );
      }
    }
  });

  return FriendListItemView;
});
