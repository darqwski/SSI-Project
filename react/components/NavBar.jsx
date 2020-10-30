import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {AppContext} from "../context/AppContextManager";

const NavBar = () => {
	const { isLogged, permission, login } = useContext(AppContext);
	return (
		<nav>
			<div className="nav-wrapper grey darken-4">
				<ul className="left">
					<li>
						{isLogged ? (
							<Link to="logout">Wyloguj</Link>
						) : (
							<Link to="login">Zaloguj</Link>
						)}

					</li>
					{permission === 'admin' ? (
						<>
							<li>
								<Link to="admin/users/">Panel użytkownikow</Link>
							</li>
							<li>
								<Link to="admin/products/">Panel produktow</Link>
							</li>
						</>
					) : null}
				</ul>
				<ul className="right">
					<li>{login ? `Zalogowany jako ${login}` : 'Niezalogowany'}</li>
				</ul>
			</div>
		</nav>
	);
};

NavBar.propTypes = {};

export default NavBar;