var mongoose = require( 'mongoose' )
  , Schema = mongoose.Schema;

var MeetSchema = Schema({
  host: String
, what: String
, when: String
, where: String
, who: { type: [String] }
});
var Meet = mongoose.model( 'Meet', MeetSchema );

module.exports = Meet;
