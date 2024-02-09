const Gig = require('../models/gig');

module.exports = {
  index,
  show,
  new: newGig,
  delete: deleteGig,
  create,
  update,
  edit,
};

async function deleteGig(req, res) {
  await Gig.findOneAndDelete(
    {_id: req.params.id,}
  );
  res.redirect('/books');
}

async function edit(req, res) {
  const gig = await Gig.findOne({_id: req.params.id});
  if (!gig) return res.redirect('/gigs');
  res.render('gigs/edit', { gig });
}


async function update(req, res) {
  try {
    const updatedGig = await Gig.findOneAndUpdate(
      {_id: req.params.id},
      req.body,
      {new: true}
    );
    return res.redirect(`/gigs/${updatedGig._id}`);
  } catch (e) {
    console.log(e.message);
    return res.redirect('/gigs');
  }
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