import React from 'react';
import { Link } from 'react-router-dom';

export default function Form({
  name, title, buttonText, onSubmit, children,
}) {
  return (
		<form action="#" onSubmit={onSubmit} className="form-authorization" name={`form-${name}`}>
		  <h2 className="form-authorization__title">{title}</h2>
		  <fieldset className="form-authorization__fieldset">
		  	{children}
      </fieldset>
		  <button type="submit" className="form-authorization__button">{buttonText}</button>
		  <Link className={name === 'sign-up' ? 'form-authorization__link' : 'form-authorization__link_hidden'} to='/sign-in'>Уже зарегистрированы? Войти</Link>
		</form>
  );
}
