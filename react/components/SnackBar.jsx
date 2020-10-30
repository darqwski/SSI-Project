import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import './snackbar.css';
import { SnackBarContext } from '../context/SnackBarManager';

const SnackBar = ({ children, id, timeout = 5000 }) => {
	const { removeSnackbar } = useContext(SnackBarContext);

	useEffect(()=>{
		const timer = setTimeout(()=>{
			removeSnackbar(id);
			clearTimeout(timer);
		}, timeout);
	});

	return (
		<div className="snackbar" onClick={()=>removeSnackbar(id)}>
			<div>
				{children}
			</div>
		</div>
	);
};

SnackBar.propTypes = {
	children: PropTypes.any,
	timeout: PropTypes.number,
	id: PropTypes.string
};

export default React.memo(SnackBar);