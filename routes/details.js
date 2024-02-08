const express = require('express');
const router = express.Router();
const detailsCtrl = require('../controllers/details');
const ensureLoggedIn = require('../config/ensureLoggedIn');


router.post('/gigs/:id/details', ensureLoggedIn, detailsCtrlCtrl.create);

router.delete('/details/:id', ensureLoggedIn, detailsCtrl.delete);

module.exports = router;