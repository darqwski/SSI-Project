const express = require('express');
const md5 = require('md5');
const { authorizeAdmin, getConnection } = require('../utils');

const router = express.Router();

router.post('/', authorizeAdmin, (req,res)=>{
	const { userId } = req.body;

	const sqlCommand = 'UPDATE `users` SET `isActive` = "1" WHERE `userId` = ?;';

	const con = getConnection();
	con.query(sqlCommand, [userId],function (err) {
		if (err) {
			res.status(500).send(JSON.stringify({ message: 'SERVER ERROR 500, Baza danych nie odpowiada' }));
		} else {
			res.send(JSON.stringify({ message: 'Użytkownika odblokowano' }));
		}
	});
});

module.exports = router;