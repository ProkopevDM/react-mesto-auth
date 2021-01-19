import React from 'react';
import Form from './Form.js';

export default function Register({ onRegister, setAuthStatus }) {
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
    onRegister({ password, email });
  };

  React.useEffect(() => {
    setAuthStatus('login');
  }, []);

  return (
		<Form onSubmit={handleSubmit} name='sign-up' title='Регистрация' buttonText='Зарегистрироваться'>
			<input onChange={handleEmailChange} name="email" type="email" className="form-authorization__input" placeholder="Email" required autoComplete="off" />
	  	<input onChange={handlePasswordChange} name="password" type="password" className="form-authorization__input" placeholder="Пароль" required autoComplete="off" />
	  </Form>
  );
}
