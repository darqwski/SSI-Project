const express = require('express');

const router = express.Router();

router.get('/', function(req, res) {
	res.cookie('user', '', { maxAge: -1 });
	res.cookie('login', '', { maxAge: -1 });
	res.cookie('permission', '', { maxAge: -1 });

	res.redirect('/');
});

module.exports = router;