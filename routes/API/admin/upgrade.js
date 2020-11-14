const express = require('express');
const { authorizeAdmin, getConnection } = require('../../utils');

const router = express.Router();

router.post('/',authorizeAdmin, (req,res)=>{
	const { userId } = req.body;

	const sqlCommand = 'UPDATE `users` SET `permission` = "admin" WHERE `userId` = ?;';

	const con = getConnection();
	con.query(sqlCommand, [userId],function (err) {
		if (err) {
			res.status(500).send(JSON.stringify({ message: 'SERVER ERROR 500, Baza danych nie odpowiada' }));
		} else {
			res.send(JSON.stringify({ message: 'Użytkownik otrzymał uprawnienia administracyjne' }));
		}
	});
});


module.exports = router;