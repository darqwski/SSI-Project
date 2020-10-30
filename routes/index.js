const express = require('express');
const router = express.Router();
var mysql = require('mysql');
var md5 = require('md5');


/* AvailablePages. */

const getConnection = () => {
	const con = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'product_quality'
	});

	return con;
};

const authorizeAdmin = (req, res, next) => {
	if (req.signedCookies.permissionSecret === 'admin') {
		next();
	} else {
		res.redirect('/');
	}
};

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

/*PRODUCTS */
router.get('/API/products', function(req, res) {
	const con = getConnection();

	const whereStatement = req.query.searchQuery ? `products.productName LIKE '%${req.query.searchQuery}%'`: '1 = 1';
	con.connect(function(err) {
		if (err) throw err;
		con.query(`
		SELECT products.*, AVG(marks.value) as mark, 
       	products.productId as productId,
		isMarked.productId as isMarked
		FROM products 
		LEFT JOIN marks as marks ON marks.productId = products.productId 
		LEFT JOIN marks as isMarked ON isMarked.productId = products.productId AND isMarked.userId = '${req.signedCookies.userId}'
		WHERE ${whereStatement}
		GROUP BY products.productId
		`,
		(err, result) => {
			if (err) throw err;
			res.send(JSON.stringify(result));
		});
	});
});

router.post('/API/products',(req,res)=>{
	const { name, brand, category, image } = req.body;

	const sqlCommand = 'INSERT INTO `products` (`productId`, `productName`, `productBrand`, `productCategory`, `productImage`) VALUES (NULL, \''+name+'\', \''+brand+'\', \''+category+'\', \''+image+'\');';

	const con = getConnection();
	con.query(sqlCommand, function (err) {
		if (err) {
			res.status(500).send(JSON.stringify({ message: 'SERVER ERROR 500, DB is not responding' }));
		} else {
			res.send(JSON.stringify({ message: 'Product has been added' }));
		}
	});
});
router.post('/API/marks',(req,res)=>{
	const { productId, mark } = req.body;

	const sqlCommand = 'INSERT INTO `marks` (`markId`, `productId`, `userId`, `value`) VALUES (NULL, \''+productId+'\', \''+req.signedCookies.userId+'\', \''+mark+'\' );';

	const con = getConnection();
	con.query(sqlCommand, function (err) {
		if (err) {
			res.status(500).send(JSON.stringify({ message: 'SERVER ERROR 500, DB is not responding' }));
		} else {
			res.send(JSON.stringify({ message: 'Product has been marked' }));
		}
	});
});

router.put('/API/products',(req,res)=>{
	const { name, brand, category, image,productId } = req.body;

	const sqlCommand = 'UPDATE `products` SET `productName`="'+name+'", `productBrand`="'+brand+'", `productCategory`="'+category+'", `productImage`="'+image+'" WHERE `productId` = "'+productId+'"';
	console.log(sqlCommand);
	const con = getConnection();
	con.query(sqlCommand, function (err) {
		if (err) {
			res.status(500).send(JSON.stringify({ message: 'SERVER ERROR 500, DB is not responding' }));
		} else {
			res.send(JSON.stringify({ message: 'Product has been updated' }));
		}
	});
});


router.post('/login', function(req, res, next) {
	const { login, password } = req.body;

	const con = getConnection();
	con.connect(function(err) {
		if (err) throw err;
		con.query(`SELECT * FROM users WHERE login="${login}" AND password="${md5(password)}"`,  (err, result) => {
			if (err) throw err;
			if(result.length===1){
				res.cookie('user', login, { signed: true });
				res.cookie('userId', result[0].userId, { signed: true });
				res.cookie('login',login);
				res.cookie('permissionSecret',result[0].permission, { signed: true });
				res.cookie('permission',result[0].permission);
				res.send(JSON.stringify({ message: 'Login successful' }));
			} else {
				res.send(JSON.stringify({ message: 'Login failed' }));
			}
		});
	});
});

router.get('/logout', function(req, res, next) {
	res.cookie('user', '', { maxAge: -1 });
	res.cookie('login', '', { maxAge: -1 });
	res.cookie('permission', '', { maxAge: -1 });

	res.redirect('/');
});

module.exports = router;
