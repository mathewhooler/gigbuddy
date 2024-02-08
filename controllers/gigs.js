const Gig = require('../models/gig');

module.exports = {
  index,
  show,
  new: newGig,
  create
};

async function index(req, res) {
  const gigs = await Gig.find({});
  res.render('gigs/index', { title: 'GIG BOARD', gigs });
}

async function show(req, res) {
  const gig = await Gig.findById(req.params.id);
}

function newGig(req, res) {
  res.render('gigs/new', { title: 'ADD GIG', errorMsg: '' });
}

async function create(req, res) {
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
}