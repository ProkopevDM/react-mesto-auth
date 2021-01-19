import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../images/logo.svg';

export default function Header({ userEmail, handleLogout, authStatus }) {
  return (
		<header className="header">
			<img src={logo} alt="Место - Россия" className="logo" />
			{authStatus === 'logout'
				&& <nav className="header__auth">
					<span className="header__auth-email">{userEmail}</span>
					<NavLink className="header__auth-status" to="/" onClick={handleLogout}>Выход</NavLink>
				</nav>
			}
			{authStatus === 'login'
				&& <NavLink className="header__auth-status" to="/sign-in" onClick={handleLogout}>Вход</NavLink>
			}
			{authStatus === 'register'
				&& <NavLink className="header__auth-status" to="/sign-up" onClick={handleLogout}>Зарегистрироваться</NavLink>
			}
		</header>
  );
}
