import React from 'react';
import { Route, BrowserRouter as Router, } from 'react-router-dom';
import Dashboard from './application/dashboard/Dashboard';
import Login from './application/login/Login';
import Users from './application/admin/users/Users';
import Products from './application/admin/products/Products';
import './materialize.css';
import AppContextManager from './context/AppContextManager';
import NavBar from './components/NavBar';
import './value-desc.css';
import AddProduct from './application/admin/add-product/AddProduct';

const routing = [
	{ path: '/', component: Dashboard },
	{ path: '/login/', component: Login },
	{ path:'/admin/users/',component: Users },
	{ path:'/admin/products/',component: Products },
	{ path:'/admin/products-add/',component: AddProduct },
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
		<App />
	</AppContextManager>
)
;