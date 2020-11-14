const express = require('express');
const md5 = require('md5');
const { getConnection } = require('../utils');

const router = express.Router();

router.post('/',(req,res)=>{
	const { login, password } = req.body;
	const con = getConnection();
	con.query('SELECT * FROM users WHERE login = ?',[login],(err, result)=>{
		if (err) {
			res.status(500).send(JSON.stringify({ message: 'SERVER ERROR 500, Baza danych nie odpowiada' }));
		} else {
			if(result.length === 0) {
				const sqlCommand = `
	INSERT INTO users (userId, login, password, permission, isActive) VALUES (NULL, ?, '${md5(password)}', 'user', '1');
`;
				con.query(sqlCommand,[login], function (err) {
					if (err) {
						res.status(500).send(JSON.stringify({ message: 'SERVER ERROR 500, Baza danych nie odpowiada' }));
					} else {
						res.send(JSON.stringify({ message: 'Zarejestrowano pomyślnie' }));
					}
				});
			} else {
				res.send(JSON.stringify({ message: 'Login już zajęty, proszę sprobowac inny' }));
			}
		}
	});
});

module.exports = router;