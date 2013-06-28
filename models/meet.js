var mongoose = require( 'mongoose' )
  , Schema = mongoose.Schema;

var MeetSchema = Schema({
  host: String
, what: String
, when: String
, where: String
, who: {
    attending: { type: [String] }
  , invited: { type: [String] }
  , declined: { type: [String] }
  }
});
var Meet = mongoose.model( 'Meet', MeetSchema );

module.exports = Meet;
