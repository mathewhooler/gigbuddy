const express = require('express');
const router = express.Router();
const detailsCtrl = require('../controllers/details');
const ensureLoggedIn = require('../config/ensureLoggedIn');
const title = 'New Gig';


router.post('/gigs/:id/details', ensureLoggedIn, detailsCtrl.create);
router.delete('/details/:id', ensureLoggedIn, detailsCtrl.delete);

module.exports = router;