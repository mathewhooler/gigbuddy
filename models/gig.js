const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const title = 'New Gig';

const gigSchema = new Schema({
  title:  {type: String, required: true},
  venue:  {type: String, required: true},
  date:   {type: String, required: true},
  time:   {type: String,},
  support:{type: String,},
  price:  {type: String,},
  ticketLink:   {type: String,},
  spotifyLink:  {type: String,},
  eventInfo:     {type: String,},
}, {
  timestamps: true
});


module.exports = mongoose.model('gig', gigSchema);