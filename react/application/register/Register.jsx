import React, { useState } from 'react';
import './register.css';
import { Requester } from '../../utils/Requester';

const Register = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [passwordRepeat, setPasswordRepeat] = useState('');
	const [error, setError] = useState(undefined);
	const onSave = () => {
		if(!login){
			setError('Brak podanego loginu');
			return;
		}
		if(!password || !passwordRepeat){
			setError('Brak podanego hasła');
			return;
		}
		if(password !== passwordRepeat){
			setError('Podane hasła różnią się');
			return;
		}
		setError(undefined);
		Requester({
			url:'/API/register',
			method: 'POST',
			data: `login=${login}&password=${password}`
		}).then(()=>{
			setTimeout(()=>window.location.href='../login/', 5000);
		});
	};

	return (
		<div className="card register-card">
			<div className="card-title">
				<h3>Panel rejestracyjny</h3>
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
				<div>
					<label>Powtórz hasło</label>
					<input value={passwordRepeat} onChange={({ target: { value } })=>setPasswordRepeat(value)} type="password" />
				</div>
				{error && <div className="error-text red-text">{error}!</div>}
			</div>
			<div className="card-action">
				<button className="btn-large green" onClick={onSave}>Zarejestruj</button>
			</div>
		</div>
	);
};

Register.propTypes = {};

export default Register;