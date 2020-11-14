const express = require('express');
const router = express.Router();
const { getConnection } = require('./utils');
const md5 = require('md5');

router.post('/', (req, res) => {
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

module.exports = router;
