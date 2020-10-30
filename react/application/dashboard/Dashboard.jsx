import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Requester } from '../../utils/Requester';
import './dashboard.css';

const Loading = () => (
	<div>Loading</div>
)

const SingleProduct = ({productBrand, productCategory, productId, productImage, productName, mark}) => {

	return (
		<div className="card single-product">
			<div className="picture">
				<img src={productImage} />
			</div>
			<div className="description">
				<div className="value-desc">
					<p className="desc">Nazwa produktu</p>
					<p className="value">{productName}</p>
				</div>
				<div className="value-desc">
					<p className="desc">Marka produktu</p>
					<p className="value">{productBrand}</p>
				</div>
				<div className="value-desc">
					<p className="desc">Kategoria produktu</p>
					<p className="value">{productCategory}</p>
				</div>
				<div className="value-desc">
					<p className="desc">Ocen produktu</p>
					<p className="value">{mark? `${mark} / 5` : 'Brak ocen'}</p>
				</div>
			</div>
		</div>
	);
}

const Dashboard = () => {
	const [data, setData] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	useEffect(()=>{
		Requester({
			method: 'GET',
			url: `/API/products?searchQuery=${searchQuery}`
		})
			.then(setData);
	},[]);

	return data ? (
		<>
			<div className="dashboard">
				{data.map((item,index)=>(
					<SingleProduct {...item} key={`SingleProduct-${index}`} />
				))}
			</div>
		</>
	): <Loading/> ;
};

Dashboard.propTypes = {};

export default Dashboard;