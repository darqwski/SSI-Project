const express = require('express');
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

router.delete('/', authorizeAdmin, (req,res)=>{
	const sqlQuery = 'DELETE FROM users WHERE userId = ?';
	const con = getConnection();
	const { userId } = req.body;
	con.query(sqlQuery, [userId], (err) => {
		if (err) {
			res.status(500).send(JSON.stringify({ message: 'SERVER ERROR 500, Baza danych nie odpowiada' }));
		} else {
			res.send(JSON.stringify({ message: 'Użytkownik został usunięty' }));
		}
	});

});

module.exports = router;