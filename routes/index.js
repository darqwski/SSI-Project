const express = require('express');
const { authorizeAdmin  } = require('./utils');

const router = express.Router();

router.get('/', function(req, res) {
	res.sendfile('./public/index.html');
});
router.get('/login', function(req, res) {
	res.sendfile('./public/index.html');
});
router.get('/admin/users', authorizeAdmin, function(req, res) {
	res.sendfile('./public/index.html');
});
router.get('/admin/products',authorizeAdmin, function(req, res) {
	res.sendfile('./public/index.html');
});
router.get('/admin/products-add',authorizeAdmin, function(req, res) {
	res.sendfile('./public/index.html');
});
router.get('/register', function(req, res) {
	res.sendfile('./public/index.html');
});
router.get('/change-password', function(req, res) {
	res.sendfile('./public/index.html');
});

module.exports = router;
