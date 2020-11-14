const mysql = require('mysql');

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

module.exports = { authorizeAdmin, getConnection };