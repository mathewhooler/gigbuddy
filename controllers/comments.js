const Comment = require('../models/comment');
const gig = require('../models/gig');


module.exports = {
  create,
};



async function create(req, res) {
    try {
    const gig = await Gig.findById(req.params.id);
      req.body.userId = req.user._id;
      req.body.userName = req.user.name;
      gig.comments.push(req.body);
      await gig.save();
    } catch (e) {
      console.log(e.message);
    }
    res.redirect(`/gigs/${gig._id}`);
  }