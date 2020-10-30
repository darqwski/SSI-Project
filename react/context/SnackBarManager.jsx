import React, { createContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import SnackBar from '../components/SnackBar';

export const SnackBarContext = createContext({});

const generateId = () => `snackbar-${Math.floor(Math.random() * (1000))}`;

const SnackBarManager = ({ children }) => {
	const [snackbars, setSnackbars] = useState([]);
	const snackBarRef = useRef(snackbars);
	snackBarRef.current = snackbars;

	const removeSnackbar = (deleteId) => {
		if(snackBarRef.current.length === 0) return;
		setSnackbars(snackBarRef.current.filter(({ id })=>id != deleteId));
	};

	const addSnackBar = ({ text, timeout = 1000 }) => {
		const generatedId = generateId();
		setSnackbars(([...snackBarRef.current, { id: generatedId, text, timeout }]));
	};

	return (
		<SnackBarContext.Provider value={{ addSnackBar, removeSnackbar }}>
			<>
				{children}
				{
					Object.entries(snackbars).map(([, { text, id }])=>(
						<SnackBar key={id} id={id}>
							{text}
						</SnackBar>
					))
				}
			</>
		</SnackBarContext.Provider>
	);
};
SnackBarManager.propTypes = {
	children: PropTypes.any
};
export default SnackBarManager;