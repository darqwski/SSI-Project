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

/*PRODUCTS */
router.get('/API/products', function(req, res) {
	const con = getConnection();

	con.connect(function(err) {
		if (err) throw err;
		con.query('SELECT *, AVG(value) as mark FROM products LEFT JOIN marks ON marks.productId = products.productId GROUP BY products.productId',
			(err, result) => {
				if (err) throw err;
				res.send(JSON.stringify(result));
			});
	});
});

router.post('API/products',(req,res)=>{
	const { name, brand, category, image } = req.body;

	const sqlCommand = 'INSERT INTO `products` (`productId`, `productName`, `productBrand`, `productCategory`, `productCategory`) VALUES (NULL, \''+name+'\', \''+brand+'\', \''+category+'\', \''+image+'\');';
	const con = getConnection();
	con.query(sqlCommand, function (err) {
		if (err) {
			res.status(500).send(JSON.stringify({ message: 'SERVER ERROR 500, DB is not responding' }));

		} else {
			res.send(JSON.stringify({ message: 'Product has been added' }));
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
				res.cookie('login',login);
				res.cookie('permissionSecret',result[0].permission, { signed: true });
				res.cookie('permission',result[0].permission);
				res.send(JSON.stringify({ message: 'Login successfull' }));
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
