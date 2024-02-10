const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');
const ensureLoggedIn = require('../config/ensureLoggedIn');


router.post('/gigs/:id/comments', ensureLoggedIn, commentsCtrl.create);

router.delete('/gigs/:gigId/comments/:commentId', ensureLoggedIn, commentsCtrl.delete);
router.put('/gigs/:gigId/comments/:commentId', ensureLoggedIn, commentsCtrl.update);

module.exports = router;