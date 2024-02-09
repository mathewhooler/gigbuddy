const Comment = require('../models/comment');
const gig = require('../models/gig');


module.exports = {
  edit,
};




async function edit(req, res) {
    const gig = await Gig.findOne({'comments._id': req.params.id});
    const comment = gig.comments.id(req.params.id);

    res.render('comments/edit', { comment });