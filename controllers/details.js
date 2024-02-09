const Gig = require('../models/gig');
const title = 'New Gig';

module.exports = {
  create,
  delete: deleteDetails
};

async function deleteDetails(req, res) {
  const gig = await Gig.findOne({ 'details._id': req.params.id, 'details.user': req.user._id });
  if (!gig) return res.redirect('/gigs');

  gig.details.remove(req.params.id);
  await gig.save();
  res.redirect(`/gigs/${gig._id}`);
}

async function create(req, res) {
  const gig = await Gig.findById(req.params.id);

  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;

  gig.details.push(req.body);
  try {
    await gig.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/gigs/${gig._id}`);
}