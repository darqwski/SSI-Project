import React from 'react';
import PropTypes from 'prop-types';

const Login = () => {

	return (
		<form action="" method="POST">
			<input name="login" />
			<input name="password" type="password"  />
			<button>LOGIN</button>
		</form>
	);
};

Login.propTypes = {

};

export default Login;