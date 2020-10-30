import React, { useContext, useState } from 'react';
import { Requester } from '../../utils/Requester';
import './login.css';
import { SnackBarContext } from '../../context/SnackBarManager';

const Login = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const { addSnackBar } = useContext(SnackBarContext);
	const onSave = e => {
		e.preventDefault();
		if(!login){
			setError('Brak podanego loginu');
			return;
		}
		if(!password){
			setError('Brak podanego hasła');
			return;
		}

		setError(undefined);
		Requester({
			url:'/login',
			method: 'POST',
			data: `login=${login}&password=${password}`
		}).then(({ message })=>{
			if(message === 'Login successful'){
				window.location.href='../';
			} else {
				addSnackBar({ text: message });
			}
		});
	};

	return (
		<form onSubmit={onSave}>
			<div className="card login-card">
				<div className="card-title">
					<h3>Panel logowania</h3>
				</div>
				<div className="card-content">
					<div>
						<label>Podaj login</label>
						<input value={login} onChange={({ target: { value } })=>setLogin(value)} />
					</div>
					<div>
						<label>Podaj hasło</label>
						<input value={password} onChange={({ target: { value } })=>setPassword(value)} type="password" />
					</div>
					{error && <div className="error-text red-text">{error}!</div>}
				</div>
				<div className="card-action">
					<button className="btn-large green" onClick={onSave}>Zaloguj</button>
				</div>
			</div>
		</form>
	);
};

Login.propTypes = {

};

export default Login;