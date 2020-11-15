import React from 'react';
import PropTypes from 'prop-types';

const IconWithDescription = ({ icon, children, onClick }) => {
	return (
		<div className="icon-with-desc" onClick={onClick}>
			<i className="material-icons">{icon}</i>
			<p>{children}</p>
		</div>
	);
};


IconWithDescription.propTypes = {
	icon: PropTypes.string,
	children: PropTypes.string,
	onClick: PropTypes.func
};

export default IconWithDescription;