const express = require('express');
const md5 = require('md5');
const { getConnection } = require('../utils');

const router = express.Router();

router.post('/',(req,res)=>{
	const { oldPassword, newPassword } = req.body;

	const sqlCommand = `SELECT * FROM users WHERE userId = ? AND password = '${md5(oldPassword)}'`;

	const con = getConnection();
	con.query(sqlCommand,[req.signedCookies.userId], function (err, result) {
		if (err) {
			res.status(500).send(JSON.stringify({ message: 'SERVER ERROR 500, Baza danych nie odpowiada' }));
		} else {
			if(result.length === 1){
				con.query(`UPDATE users SET password = '${md5(newPassword)}' WHERE userId = ?`, [req.signedCookies.userId], (innerErr)=>{
					if(innerErr){
						res.status(500).send(JSON.stringify({ message: 'SERVER ERROR 500, Baza danych nie odpowiada' }));
					} else {
						res.send(JSON.stringify({ message: 'Hasło zmieniono pomyślnie' }));
					}
				});
			} else {
				res.send(JSON.stringify({ message: 'Stare hasło jest błędne' }));
			}
		}
	});
});

module.exports = router;