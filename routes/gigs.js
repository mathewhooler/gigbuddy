const express = require('express');
const router = express.Router();

const gigsCtrl = require('../controllers/gigs');
const ensureLoggedIn = require('../config/ensureLoggedIn');
	

router.get('/', gigsCtrl.index);
router.get('/new', ensureLoggedIn, gigsCtrl.new);
router.get('/:id', gigsCtrl.show);
router.post('/', ensureLoggedIn, gigsCtrl.create);
	
module.exports = router;
