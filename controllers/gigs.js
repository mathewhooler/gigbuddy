const Gig = require('../models/gig');
const title = 'New Gig';


module.exports = {
  index,
  show,
  new: newGig,
  update,
  create,
  addComment,
};

async function index(req, res) {
  const gigs = await Gig.find({});
  res.render('gigs/index', { title: '', gigs });
}
async function show(req, res) {
  const gig = await Gig.findById(req.params.id);
  res.render('gigs/show', { title: 'GIG DETAILS', gig });
}

function newGig(req, res) {
  res.render('gigs/new', { title: 'ADD GIG', errorMsg: '' });
}

async function update(req, res) {
  const gig = await Gig.findOne({'comments._id': req.params.id});
  const commentSubdoc = gig.comments.id(req.params.id);
  if (!commentSubdoc.userId.equals(req.user._id)) return res.redirect(`/gigs/${gig._id}`);

  commentSubdoc.text = req.body.text;
  try {
    await gig.save();
  } catch (e) {
    console.log(e.message);
  }
  res.redirect(`/gigs/${gig._id}`);
}

async function addComment(req, res) {
  const gig = await Gig.findOne(req.params.id);

  const newComment = { text: req.body.text };

  gig.comments.push(newComment);

  try {
    await gig.save();
  } catch (e) {
    console.log(e.message);
  }
  res.redirect(`/gigs/${gig.id}`);
}


async function create(req, res) {
  try {
    const gig = await Gig.findById(req.params.id);
    req.body.userId = req.user._id;
    req.body.userName = req.user.name;
    // res.redirect(`/gigs/${gig._id}`);
    gig.comments.push(req.body);
    await gig.save();
  } catch (err) {
    console.log(err);
    // res.render('gigs/new', { errorMsg: err.message });
  }
  res.redirect(`/gigs/${gig.id}`);
};