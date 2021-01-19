import React from 'react';
import Form from './Form.js';

export default function Login({ onAuthorization, setAuthStatus }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onAuthorization({ password, email });
  };

  React.useEffect(() => {
    setAuthStatus('register');
  }, []);

  return (
		<Form onSubmit={handleSubmit} name='sign-in' title='Вход' buttonText='Войти'>
			<input onChange={handleEmailChange} name="email" type="email" className="form-authorization__input" placeholder="Email" required autoComplete="off" />
	    <input onChange={handlePasswordChange} name="password" type="password" className="form-authorization__input" placeholder="Пароль" required autoComplete="off" />
		</Form>
  );
}
