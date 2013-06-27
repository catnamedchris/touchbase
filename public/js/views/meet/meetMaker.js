define([
  'js/models/meet'
, 'js/views/header/headerMeetMaker'
, 'js/views/user/friend/friendList'
, 'js/views/meet/meetForm'
], function( MeetModel, HeaderMeetMakerView, FriendListView, MeetFormView ) {
  var MeetMaker = Backbone.View.extend({
    className: 'meet-maker'
  , initialize: function( options ) {
      this.App = options.App;

      var host = this.App.Views.root.model.get( 'username' );
      this.model = new MeetModel({
        host: host
      , who: []
      });

      this.views = {};
      this.views.header = new HeaderMeetMakerView({ App: this.App });
      this.views.friendList = new FriendListView({ App: this.App });
      this.views.meetForm = new MeetFormView({
        App: this.App
      , model: this.model
      });

      this.App.Pubsub.on( 'select:friend', this.addInvitee, this );
      this.App.Pubsub.on( 'deselect:friend', this.removeInvitee, this );
      this.App.Pubsub.on( 'who-selected:meet-maker', this.finishMeetForm, this );
    }
  , render: function() {
      this.delegateEvents();
      this.$el.append( this.views.header.el );
      this.$el.append( this.views.friendList.el );

      this.views.header.render();
      this.views.friendList.render();
    }
  , addInvitee: function( username ) {
      var invitees = this.model.get( 'who' );
      invitees.push( username );
      this.model.set( 'who', invitees );
    }
  , removeInvitee: function( username ) {
      var invitees = this.model.get( 'who' );
      invitees = _.filter(who, function( name ) {
        return name !== username;
      });
      this.model.set( 'who', invitees );
    }
  , finishMeetForm: function() {
      this.views.friendList.remove();
      this.$el.append( this.views.meetForm.el );
      this.views.meetForm.render();
    }
  });

  return MeetMaker;
});
