import React, { useState } from 'react';
import { Requester } from '../../../utils/Requester';

const AddProduct = () => {
	const [name, setName ] = useState('');
	const [brand, setBrand ] = useState('');
	const [category, setCategory ] = useState('');
	const [image, setImage ] = useState('');

	const onSave = () => {
		Requester({
			method:'POST',
			url: '/API/products/',
			data: `brand=${brand}&category=${category}&image=${image}&name=${name}`
		})
			.then(()=>{
				window.location.href='../products/';
			})
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

AddProduct.propTypes = {};

export default AddProduct;