const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detailsSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  support: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: String,
  userAvatar: String
}, {
  timestamps: true
});

const gigSchema = new Schema({
  title: { type: String, required: true },
  venue: {type: String,},
  date:  {type: String,},
  time:  {type: String,},
  details: [detailsSchema]
}, {
  timestamps: true
});


module.exports = mongoose.model('gig', gigSchema);