const express = require('express');
const router = express.Router();
const { getConnection } = require('../utils');


router.get('/', function(req, res) {
	const con = getConnection();
	const { mine } = req.query;
	const whereStatement = req.query.searchQuery ? `
	products.productName LIKE '%${req.query.searchQuery}%' 
	OR products.productBrand LIKE '%${req.query.searchQuery}%'
	OR products.productCategory LIKE '%${req.query.searchQuery}%'
	`: '1 = 1';
	const sqlQuery = `
		SELECT products.*, AVG(marks.value) as mark, 
       	products.productId as productId,
		isMarked.productId as isMarked
		FROM products 
		LEFT JOIN marks as marks ON marks.productId = products.productId 
		${mine === 'true' ? 'INNER' : 'LEFT'} JOIN marks as isMarked 
			ON isMarked.productId = products.productId AND isMarked.userId = '${req.signedCookies.userId}'
		WHERE ${whereStatement}
		GROUP BY products.productId
		`;
	con.connect(function(err) {
		if (err) throw err;
		con.query(sqlQuery,
			(err, result) => {
				if (err) throw err;
				res.send(JSON.stringify(result));
			});
	});
});

router.post('/',(req,res)=>{
	const { name, brand, category, image } = req.body;

	const sqlCommand = 'INSERT INTO `products` (`productId`, `productName`, `productBrand`, `productCategory`, `productImage`) VALUES (NULL, \''+name+'\', \''+brand+'\', \''+category+'\', \''+image+'\');';

	const con = getConnection();
	con.query(sqlCommand, function (err) {
		if (err) {
			res.status(500).send(JSON.stringify({ message: 'SERVER ERROR 500, Baza danych nie odpowiada' }));
		} else {
			res.send(JSON.stringify({ message: 'Produkt dodano' }));
		}
	});
});

router.delete('/',(req,res)=>{
	const { productId } = req.body;

	const sqlCommand = 'DELETE FROM `marks` WHERE productId = ?;';

	const con = getConnection();
	con.query(sqlCommand, [productId],function (err) {
		if (err) {
			res.status(500).send(JSON.stringify({ message: 'SERVER ERROR 500, Baza danych nie odpowiada' }));
		} else {
			con.query('DELETE FROM `products` WHERE productId = ?',[productId], (err)=>{
				if (err) {
					res.status(500).send(JSON.stringify({ message: 'SERVER ERROR 500, Baza danych nie odpowiada' }));
				} else {
					res.send(JSON.stringify({ message: 'Produkt usunięto' }));
				}
			});
		}
	});
});

router.put('/',(req,res)=>{
	const { name, brand, category, image,productId } = req.body;

	const sqlCommand = 'UPDATE `products` SET `productName` = ?, `productBrand`= ? , `productCategory`= ?, `productImage`= ? WHERE `productId` = ?';
	const con = getConnection();
	con.query(sqlCommand, [name, brand, category, image, productId],function (err) {
		if (err) {
			res.status(500).send(JSON.stringify({ message: 'SERVER ERROR 500, Baza danych nie odpowiada' }));
		} else {
			res.send(JSON.stringify({ message: 'Produkt został zmieniony' }));
		}
	});
});

module.exports = router;