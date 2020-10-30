import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Requester } from '../../../utils/Requester';

const SingleProduct = ({ productBrand, productCategory, productId, productImage, productName, mark }) => {
	const [name, setName ] = useState(productName);
	const [brand, setBrand ] = useState(productBrand);
	const [category, setCategory ] = useState(productCategory);
	const [image, setImage ] = useState(productImage);
	return (
		<div className="card">
			<div>
				<label>Nazwa produktu</label>
				<input value={name} onChange={({ target: { value } })=> setName(value)} />
			</div>
		</div>
	);
};

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
		<div className="dashboard">
			{data.map((item,index)=>(
				<SingleProduct {...item} key={`SingleProduct-${index}`} />
			))}
		</div>
	): <Loading/> ;
};

Products.propTypes = {};

export default Products;