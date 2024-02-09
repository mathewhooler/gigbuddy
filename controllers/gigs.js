const Gig = require('../models/gig');

module.exports = {
  index,
  show,
  new: newGig,
  delete: deleteGig,
  create,
};

async function deleteGig(req, res) {
  const gig = await Gig.findOne({ 
    'gig._id': req.params.id,
    'gig.user': req.user._id
  });
  if (!gig) return res.redirect('/gigs');

  gig.remove(req.params.id);
  await gig.save();
  res.redirect(`/gigs/${gig._id}`);
}

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

async function create(req, res) {
  console.log(req.body);
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  try {
    const gig = await Gig.create(req.body);

    res.redirect(`/gigs/${gig._id}`);
  } catch (err) {
    console.log(err);
    res.render('gigs/new', { errorMsg: err.message });
  }

};