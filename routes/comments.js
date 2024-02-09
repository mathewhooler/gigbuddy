const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');
const ensureLoggedIn = require('../config/ensureLoggedIn');
const title = 'New Gig';


router.post('/gigs/:id/comments', ensureLoggedIn, commentsCtrl.create);
router.delete('/comments/:id', ensureLoggedIn, commentsCtrl.delete);

module.exports = router;