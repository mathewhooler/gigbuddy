const Gig = require('../models/gig');
const Comment = require('../models/comments');

module.exports = {
  create,
  delete: deleteComment,
  update,
};

async function update(req,res){
    const comment = await Comment.findById(req.params.commentId)
     comment.description = req.body.description;
    await comment.save()
    // await Gig.findOneAndUpdate({_id:req.params.gigId,comments:req.params.commentId},{$set:{description:req.body.description}});
    res.redirect(`/gigs/${req.params.gigId}`);
}

async function deleteComment(req, res) {
    await Gig.updateOne({_id:req.params.gigId},{$pull:{comments:{$in:[req.params.commentId]}}},{new: true})
  res.redirect(`/gigs/${req.params.gigId}`);
}

async function create(req, res) {
  const gig = await Gig.findById(req.params.id);

  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;
  try {
      const comment = await Comment.create(req.body);
    gig.comments.push(comment._id);
    await gig.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/gigs/${gig._id}`);
}