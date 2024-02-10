const express = require('express');
const router = express.Router();

const gigsCtrl = require('../controllers/gigs');
const ensureLoggedIn = require('../config/ensureLoggedIn');
	
router.post('/', ensureLoggedIn, gigsCtrl.create);
router.get('/', gigsCtrl.index);
router.get('/new', ensureLoggedIn, gigsCtrl.new);
router.get('/:id', gigsCtrl.show);
router.put('/gigs/:id', ensureLoggedIn, gigsCtrl.update);

module.exports = router;