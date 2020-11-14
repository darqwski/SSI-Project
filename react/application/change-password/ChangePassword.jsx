import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Requester } from '../../utils/Requester';
import { SnackBarContext } from '../../context/SnackBarManager';

const ChangePassword = () => {
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [passwordRepeat, setPasswordRepeat] = useState('');
	const [error, setError] = useState(undefined);
	const { addSnackBar } = useContext(SnackBarContext);
	const onSave = () => {
		if(!oldPassword ||!newPassword || !passwordRepeat){
			setError('Brak podanego hasła');
			return;
		}

		if(newPassword !== passwordRepeat){
			setError('Podane hasła różnią się');
			return;
		}
		setError(undefined);
		Requester({
			url:'/API/change-password',
			method: 'POST',
			data: `newPassword=${newPassword}&oldPassword=${oldPassword}`
		}).then(({ message })=>{
			if(message == 'Hasło zmieniono pomyślnie'){
				addSnackBar({ text: `${message}, za 5s nastąpi przekierowanie na stronę głowną` });
				setTimeout(()=>window.location.href='../', 5000);
			} else {
				addSnackBar({ text: message });
			}
		});
	};

	return (
		<div className="card register-card">
			<div className="card-title">
				<h3>Panel zmiany hasła</h3>
			</div>
			<div className="card-content">
				<div>
					<label>Podaj stare hasło</label>
					<input value={oldPassword} onChange={({ target: { value } })=>setOldPassword(value)} type="password" />
				</div>
				<div>
					<label>Podaj nowe hasło</label>
					<input value={newPassword} onChange={({ target: { value } })=>setNewPassword(value)} type="password" />
				</div>
				<div>
					<label>Powtórz hasło</label>
					<input value={passwordRepeat} onChange={({ target: { value } })=>setPasswordRepeat(value)} type="password" />
				</div>
				{error && <div className="error-text red-text">{error}!</div>}
			</div>
			<div className="card-action">
				<button className="btn-large green" onClick={onSave}>Zmień hasło</button>
			</div>
		</div>
	);
};

ChangePassword.propTypes = {};

export default ChangePassword;