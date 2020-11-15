import React, { createContext } from 'react';
import PropTypes from 'prop-types';

export const AppContext = createContext({});

const getCookie = (name) => {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
};

const AppContextManager = ({ children }) => {
	const login = (getCookie('login'));
	const permission = (getCookie('permission'));
	const isLogged = !!getCookie('user');
	console.log({ login, permission, isLogged });
	return (
		<AppContext.Provider value={{ login, permission, isLogged }}>{children}</AppContext.Provider>
	);
};

AppContextManager.propTypes = {
	children: PropTypes.any
};

export default AppContextManager;