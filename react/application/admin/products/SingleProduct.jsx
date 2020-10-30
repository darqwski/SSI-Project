import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Requester } from '../../../utils/Requester';

const SingleProduct = ({ productBrand, productCategory, productId, productImage, productName }) => {
	const [name, setName ] = useState(productName);
	const [brand, setBrand ] = useState(productBrand);
	const [category, setCategory ] = useState(productCategory);
	const [image, setImage ] = useState(productImage);

	const onSave = () => {
		Requester({
			method:'PUT',
			url: '/API/products/',
			data: `brand=${brand}&category=${category}&image=${image}&name=${name}&productId=${productId}`
		})
			.then(()=>{})
			.catch(()=>{});
	};

	return (
		<div className="card product-edit">
			<div>
				<label>Nazwa produktu</label>
				<input value={name} onChange={({ target: { value } })=> setName(value)} />
			</div>
			<div>
				<label>Marka produktu</label>
				<input value={brand} onChange={({ target: { value } })=> setBrand(value)} />
			</div>
			<div>
				<label>Kategoria produktu</label>
				<input value={category} onChange={({ target: { value } })=> setCategory(value)} />
			</div>
			<div>
				<label>Link do obrazka produktu</label>
				<input value={image} onChange={({ target: { value } })=> setImage(value)} />
			</div>

			<button className="btn-large green" onClick={onSave}> ZAPISZ </button>
		</div>
	);
};

SingleProduct.propTypes = {
	productBrand: PropTypes.string,
	productCategory: PropTypes.string,
	productId: PropTypes.string,
	productImage: PropTypes.string,
	productName: PropTypes.string
};

export default SingleProduct;