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
router.get('/register', function(req, res) {
	res.sendfile('./public/index.html');
});
router.get('/change-password',authorizeAdmin, function(req, res) {
	res.sendfile('./public/index.html');
});

/*PRODUCTS */
router.get('/API/products', function(req, res) {
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

router.post('/API/products',(req,res)=>{
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

router.delete('/API/products',(req,res)=>{
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

router.put('/API/products',(req,res)=>{
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

/* MARKS */
router.post('/API/marks',(req,res)=>{
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

/*LOGIN */

router.post('/login', function(req, res, next) {
	const { login, password } = req.body;

	const con = getConnection();
	con.connect(function(err) {
		if (err) throw err;
		con.query(`SELECT * FROM users WHERE login="${login}" AND password="${md5(password)}"`,  (err, result) => {
			if (err) throw err;
			if(result.length===1){
				if( !result[0].isActive ){
					res.send(JSON.stringify({ message: 'Użytkownik jest zablokowany.' }));
					return;
				}
				res.cookie('user', login, { signed: true });
				res.cookie('userId', result[0].userId, { signed: true });
				res.cookie('login',login);
				res.cookie('permissionSecret',result[0].permission, { signed: true });
				res.cookie('permission',result[0].permission);
				res.send(JSON.stringify({ message: 'Logowanie pomyślne' }));
			} else {
				res.send(JSON.stringify({ message: 'Logowanie nie powiodło się' }));
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


/* USERS */

router.get('/API/users', authorizeAdmin, (req,res)=>{
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

router.post('/API/change-password',(req,res)=>{
	const { oldPassword, newPassword } = req.body;

	const sqlCommand = `SELECT * FROM users WHERE userId = ? AND password = '${md5(oldPassword)}'`;

	const con = getConnection();
	con.query(sqlCommand,[req.signedCookies.userId], function (err, result) {
		if (err) {
			res.status(500).send(JSON.stringify({ message: 'SERVER ERROR 500, Baza danych nie odpowiada' }));
		} else {
			if(result.length === 1){
				con.query(`UPDATE users SET password = '${md5(newPassword)}' WHERE userId = ?`, [req.signedCookies.userId], (innerErr, result)=>{
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
router.post('/API/register',(req,res)=>{
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
router.post('/API/block',(req,res)=>{
	const { userId } = req.body;

	const sqlCommand = 'UPDATE `users` SET `isActive` = "0" WHERE `userId` = ?;';

	const con = getConnection();
	con.query(sqlCommand, [userId],function (err) {
		if (err) {
			res.status(500).send(JSON.stringify({ message: 'SERVER ERROR 500, Baza danych nie odpowiada' }));
		} else {
			res.send(JSON.stringify({ message: 'Użytkownika zablokowano' }));
		}
	});
});


router.post('/API/unblock',(req,res)=>{
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
router.post('/API/admin/downgrade',(req,res)=>{
	const { userId } = req.body;

	const sqlCommand = 'UPDATE `users` SET `permission` = "user" WHERE `userId` = ?;';

	const con = getConnection();
	con.query(sqlCommand, [userId],function (err) {
		if (err) {
			res.status(500).send(JSON.stringify({ message: 'SERVER ERROR 500, Baza danych nie odpowiada' }));
		} else {
			res.send(JSON.stringify({ message: 'Użytkownik utracił uprawnienia administracyjne' }));
		}
	});
});
router.post('/API/admin/upgrade',(req,res)=>{
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
