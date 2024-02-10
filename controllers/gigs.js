const Gig = require('../models/gig');
const user = require('../models/user');
const title = 'New Gig';


module.exports = {
  index,
  show,
  new: newGig,
  update,
  create,
};

async function index(req, res) {
  const gigs = await Gig.find({});
  res.render('gigs/index', { title: '', gigs });
}
async function show(req, res) {
  const gig = await Gig.findById(req.params.id).populate("comments");
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



async function create(req, res) {




  try {
    req.body.user=req.user._id;
    const gig = await Gig.create(req.body);
    console.log(await user.findById(req.user._id))
  } catch (err) {
    console.log(err);
    res.render('gigs/new', { errorMsg: err.message });
  }
  res.redirect(`/gigs`);
};