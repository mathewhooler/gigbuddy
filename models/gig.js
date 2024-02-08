const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gigSchema = new Schema({
  title: { type: String, required: true },

}, {
  timestamps: true
});

module.exports = mongoose.model('Gig', gigSchema);