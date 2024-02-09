const express = require('express');
const router = express.Router();

const gigsCtrl = require('../controllers/gigs');
const ensureLoggedIn = require('../config/ensureLoggedIn');
	

router.post('/', ensureLoggedIn, gigsCtrl.create);
router.get('/', gigsCtrl.index);
router.get('/new', ensureLoggedIn, gigsCtrl.new);
router.get('/:id', gigsCtrl.show);
router.get('/gig', ensureLoggedIn, gigsCtrl.edit);
router.put('/gigs/:id', ensureLoggedIn, gigsCtrl.update);
router.delete('/gigs/:id', ensureLoggedIn, gigsCtrl.delete);

	
module.exports = router;
