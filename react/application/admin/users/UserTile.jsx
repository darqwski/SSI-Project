import React from 'react';
import PropTypes from 'prop-types';
import { Requester } from '../../../utils/Requester';
import IconWithDescription from '../../../components/IconWithDescription';

const UserTile = ({ login, permission, isActive, userId, refresh }) => {
	const isAdmin = permission === 'admin';

	const changeActive = () =>{
		Requester({
			url:isActive ? '/API/block': '/API/unblock',
			method: 'POST',
			data: `userId=${userId}`
		}).then(()=>{
			refresh();
		});
	};

	const changePermission = () =>{
		Requester({
			url:isAdmin ? '/API/admin/downgrade': '/API/admin/upgrade',
			method: 'POST',
			data: `userId=${userId}`
		}).then(()=>{
			refresh();
		});
	};

	const deleteUser = () =>{
		Requester({
			url: '/API/users',
			method: 'DELETE',
			data: `userId=${userId}`
		}).then(()=>{
			refresh();
		});
	};

	return (
		<div className="card user-tile">
			<div className="card-title">{login}</div>
			<div className="card-action">
				<IconWithDescription onClick={changeActive} icon={isActive ? 'lock' : 'lock_open'}>
					{isActive ? 'Zablokuj użytkownika' : 'Odblokuj użytkownika'}
				</IconWithDescription>
				<IconWithDescription onClick={changePermission} icon={isAdmin ? 'star_border' : 'star'}>
					{isAdmin ? 'Odbierz uprawnieniania administracyjne' : 'Nadaj uprawnienia administracyjne'}
				</IconWithDescription>
				<IconWithDescription onClick={deleteUser} icon="delete">
                    Usuń użytkownika
				</IconWithDescription>
			</div>
		</div>
	);
};


UserTile.propTypes = {
	login:PropTypes.string,
	permission: PropTypes.string,
	isActive: PropTypes.bool,
	userId:PropTypes.number,
	refresh: PropTypes.func
};

export default UserTile;