import React, { useEffect, useState } from 'react';
import { Requester } from '../../../utils/Requester';
import Loading from '../../../components/Loading';
import { Link } from 'react-router-dom';
import SingleProduct from './SingleProduct';

const Products = () => {
	const [data, setData] = useState([]);

	useEffect(()=>{
		Requester({
			method: 'GET',
			url: '/API/products?searchQuery='
		})
			.then(setData);
	},[]);

	return data ? (
		<>
			<div>
				<Link to="/admin/products-add/"><button className="btn-large blue"> Dodaj nowy produkt </button></Link>
			</div>
			<div className="dashboard">
				{data.map((item,index)=>(
					<SingleProduct {...item} key={`SingleProduct-${index}`} />
				))}
			</div>
		</>
	): <Loading/> ;
};

Products.propTypes = {};

export default Products;