import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContextManager';

const NavBar = () => {
	const { isLogged, permission, login } = useContext(AppContext);
	return (
		<nav>
			<div className="nav-wrapper grey darken-4">
				<ul className="left">
					<li><Link to="/">Strona główna</Link></li>
					{permission === 'admin' ? (
						<>
							<li>
								<Link to="/admin/users/">Panel użytkownikow</Link>
							</li>
							<li>
								<Link to="/admin/products/">Panel produktow</Link>
							</li>
						</>
					) : null}
				</ul>
				<ul className="right">
					{isLogged ? (
						<>
							<li><Link to="/logout">Wyloguj</Link></li>
							<li><Link to="/change-password">Zmień hasło</Link></li>
						</>
					) : (
						<>
							<li><Link to="/login">Zaloguj</Link></li>
							<li><Link to="/register">Zarejestruj</Link></li>
						</>
					)}
					<li>{login ? `Zalogowany jako ${login}` : 'Niezalogowany'}</li>
				</ul>
			</div>
		</nav>
	);
};

NavBar.propTypes = {};

export default NavBar;