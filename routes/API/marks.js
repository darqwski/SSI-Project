const express = require('express');
const router = express.Router();
const { getConnection } = require('../utils');

router.post('/',(req,res)=>{
	const { productId, mark } = req.body;

	const sqlCommand = 'INSERT INTO `marks` (`markId`, `productId`, `userId`, `value`) VALUES (NULL, ?, ?, ? );';

	const con = getConnection();
	con.query(sqlCommand, [productId, req.signedCookies.userId ,mark],function (err) {
		if (err) {
			res.status(500).send(JSON.stringify({ message: 'SERVER ERROR 500, Baza danych nie odpowiada' }));
		} else {
			res.send(JSON.stringify({ message: 'Produkt oceniono' }));
		}
	});
});


module.exports=router;