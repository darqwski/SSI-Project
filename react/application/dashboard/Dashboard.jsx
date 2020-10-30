import React, { useContext, useEffect, useState } from 'react';
import { Requester } from '../../utils/Requester';
import Loading from '../../components/Loading';
import { AppContext } from '../../context/AppContextManager';
import SingleProductView from './SingleProductView';
import './dashboard.css';

const Dashboard = () => {
	const [data, setData] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [mine, setMine] = useState(false)
	const [isRefresh, setRefresh] = useState(true)
	const refresh = () =>  setRefresh(i=>!i);

	const { isLogged } = useContext(AppContext);
	useEffect(()=>{
		Requester({
			method: 'GET',
			url: `/API/products?searchQuery=${searchQuery}&mine=${mine}`
		})
			.then(setData);
	},[ searchQuery, isRefresh, mine ]);

	return (
		<>
			<div className="card search-field">
				<i className="material-icons search-icon">search</i>
				<div>
					<input
						autoFocus
						className="input-field"
						placeholder=""
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
						id="search-query-input"
					/>
					<label htmlFor="search-query-input">Wyszukiwanie</label>
				</div>
				{isLogged  && <label>
					<input
						type="checkbox"
						className="filled-in"
						checked={mine ? true : undefined}
						onClick={()=>setMine(i=>!i)}
					/>
					<span>Szukaj tylko moich produktów</span>
				</label>}
			</div>
			<div className="dashboard">
				{data ? data.map((item,index)=>(
					<SingleProductView {...item} key={`SingleProduct-${index}`} isLogged={isLogged} refresh={refresh} />
				)) : <Loading/> }
			</div>
		</>
	);
};

Dashboard.propTypes = {};

export default Dashboard;