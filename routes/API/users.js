const express = require('express');
const md5 = require('md5');
const { authorizeAdmin, getConnection } = require('../utils');

const router = express.Router();

router.get('/', authorizeAdmin, (req,res)=>{
	const sqlQuery = 'SELECT userId, login, permission, isActive FROM users';
	const con = getConnection();
	con.connect(function(err) {
		if (err) throw err;
		con.query(sqlQuery,
			(err, result) => {
				if (err) throw err;
				res.send(JSON.stringify(result));
			});
	});

});

module.exports = router;