import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Requester } from '../../../utils/Requester';
import Loading from '../../../components/Loading';
import SingleProduct from './SingleProduct';
import './products.css';

const Products = () => {
	const [data, setData] = useState([]);
	const [isRefresh, setRefresh] = useState(true)
	const refresh = () =>  setRefresh(i=>!i);
	useEffect(()=>{
		setData([]);
		Requester({
			method: 'GET',
			url: '/API/products?searchQuery='
		})
			.then(setData);
	},[isRefresh]);

	return data ? (
		<>
			<div className="dashboard-link">
				<Link to="/admin/products-add/">
					<button className="btn-large blue"> Dodaj nowy produkt </button>
				</Link>
			</div>
			<div className="dashboard">
				{data?.length ? data.map((item,index)=>(
					<SingleProduct {...item} key={`SingleProduct-${index}`} refresh={refresh} />
				)) : <p className="no-products">Brak produktów, <Link to="../products-add/">KLIKNIJ</Link> aby dodać nowy produkt</p>}
			</div>
		</>
	): <Loading/> ;
};

Products.propTypes = {};

export default Products;