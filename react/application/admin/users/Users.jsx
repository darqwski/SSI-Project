import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Requester } from '../../../utils/Requester';
import Loading from '../../../components/Loading';
import './users.css';

const UserTile = ({ login, permission, isActive, userId, refresh }) => {
	const isAdmin = permission === 'admin';
	const  changeActive = () =>{
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

	return (
		<div className="card user-tile">
			<div className="card-title">{login}</div>
			<div className="card-content">
				<button className={isAdmin ? 'btn orange' : 'btn blue'} onClick={changePermission}>
					{isAdmin ? 'Odbierz uprawnieniania administracyjne' : 'Nadaj uprawnienia administracyjne'}
				</button>
			</div>
			<div className="card-action">
				<button className={isActive ? 'btn red' : 'btn green'} onClick={changeActive}>
					{isActive ? 'Zablokuj użytkownika' : 'Odblokuj użytkownika'}
				</button>
			</div>
		</div>
	);
};

const Users = () => {
	const [data, setData] = useState([]);
	const [isRefresh, setRefresh] = useState(true);
	const refresh = () => setRefresh(i=>!i);

	useEffect(()=>{
		Requester({
			method: 'GET',
			url: '/API/users'
		})
			.then(setData);
	},[isRefresh]);

	return data ? (
		<div className="dashboard">
			{data.map((item,index)=>(<UserTile {...item} key={`UserTile-${index}`} refresh={refresh} />))}
		</div>
	) : <Loading/>;
};

Users.propTypes = {};

export default Users;