define([
  'js/models/meet'
, 'js/views/header/headerMeetMaker'
, 'js/views/user/friend/friendList'
, 'js/views/meet/meetForm'
, 'js/views/meet/meetConfirmation'
], function( MeetModel, HeaderMeetMakerView, FriendListView, MeetFormView, MeetConfirmationView ) {
  var MeetMaker = Backbone.View.extend({
    className: 'meet-maker'
  , initialize: function( options ) {
      this.App = options.App;

      var host = this.App.Views.root.model.get( 'username' );
      this.model = new MeetModel({
        host: host
      , who: {
          attending: [ host ]
        , invited: []
        , declined: []
        }
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
      this.App.Pubsub.on( 'done:meet-maker', this.renderConfirmation, this  );
    }
  , render: function() {
      this.delegateEvents();
      this.$el.append( this.views.header.el );
      this.$el.append( this.views.friendList.el );

      this.views.header.render();
      this.views.friendList.render();
    }
  , addInvitee: function( username ) {
      var meetModel = this.model.clone()
        , who = meetModel.get( 'who' );

      who.invited.push( username );
      this.model.set( 'who', who );
    }
  , removeInvitee: function( username ) {
      var meetModel = this.model.clone()
        , who = meetModel.get( 'who' );

      who.invited = _.filter(who.invited, function( name ) {
        return name !== username;
      });
      this.model.set( 'who', who );
    }
  , finishMeetForm: function() {
      this.views.friendList.remove();
      this.$el.append( this.views.meetForm.el );
      this.views.meetForm.render();
    }
  , renderConfirmation: function() {
      var meetConfirmation = new MeetConfirmationView({
        App: this.App
      , model: this.model
      });
      this.$el.append( meetConfirmation.el );
      meetConfirmation.render();
    }
  });

  return MeetMaker;
});
