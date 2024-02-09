const Gig = require('../models/gig');
const title = 'New Gig';


module.exports = {
  index,
  show,
  new: newGig,
  delete: deleteGig,
  update,
  create,
  edit,
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



async function deleteGig(req, res) {
  await Gig.findOneAndDelete(
    {_id: req.params.id,}
  );
  res.redirect('/gigs');
}

async function edit(req, res) {
  const gig = await Gig.findOne({'comments._id': req.params.id});
  const comment = gig.comments.id(req.params.id);
  res.render('comments/edit', { comment });
}




async function create(req, res) {
  console.log(req.body);
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  try {
    const gig = await Gig.create(req.body);
    req.body.userId = req.user._id;
    req.body.userName = req.user.name;
    res.redirect(`/gigs/${gig._id}`);
    gig.comments.push(req.body);
    await gig.save();
  } catch (err) {
    console.log(err);
    res.render('gigs/new', { errorMsg: err.message });
  }
  res.redirect(`/gigs/${gig._id}`);
};