import React from 'react';
import { Route, BrowserRouter as Router, } from 'react-router-dom';
import Dashboard from './application/dashboard/Dashboard';
import Login from './application/login/Login';
import Users from './application/admin/users/Users';
import Products from './application/admin/products/Products';
import AppContextManager from './context/AppContextManager';
import AddProduct from './application/admin/add-product/AddProduct';
import ChangePassword from './application/change-password/ChangePassword';
import Register from './application/register/Register';
import NavBar from './components/NavBar';
import './materialize.css';
import './value-desc.css';
import SnackBarManager from "./context/SnackBarManager";

const routing = [
	{ path: '/', component: Dashboard },
	{ path: '/login/', component: Login },
	{ path: '/register/', component: Register },
	{ path:'/admin/users/',component: Users },
	{ path:'/admin/products/',component: Products },
	{ path:'/admin/products-add/',component: AddProduct },
	{ path:'/change-password/',component: ChangePassword },
];

const App = () => {
	return (
		<div>
			<Router forceRefresh>
				<NavBar/>
				{routing.map(({ path, component }, index)=> (
					<Route exact path={path} component={component} key={`routing-${index}`} />
				))}
			</Router>
		</div>
	);
};

export default ()=>(
	<AppContextManager>
		<SnackBarManager>
			<App />
		</SnackBarManager>
	</AppContextManager>
)
;