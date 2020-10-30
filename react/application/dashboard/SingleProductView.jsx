import React from 'react';
import PropTypes from 'prop-types';
import MarkComponent from './MarkComponent';

const SingleProductView = ({ productBrand, productCategory, productId, productImage, productName, mark, isLogged, isMarked }) => (
	<div className="single-product card">
		<div className="picture">
			<img src={productImage}/>
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
				<p className="value">{mark ? `${mark} / 5` : 'Brak ocen'}</p>
			</div>
			{isMarked === null && isLogged ? (
				<MarkComponent productId={productId}/>
			) : null}
		</div>
	</div>
);


SingleProductView.propTypes = {
	productBrand: PropTypes.string,
	productCategory: PropTypes.string,
	productId: PropTypes.string,
	productImage: PropTypes.string,
	productName: PropTypes.string,
	mark: PropTypes.string,
	isLogged: PropTypes.bool,
	isMarked: PropTypes.string,
};

export default SingleProductView;