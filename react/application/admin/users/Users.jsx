import React, { useEffect, useState } from 'react';
import { Requester } from '../../../utils/Requester';
import Loading from '../../../components/Loading';
import UserTile from './UserTile';
import './users.css';

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