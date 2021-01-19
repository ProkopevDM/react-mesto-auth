import React from 'react';

export default function Footer({ isShow }) {
  return (
		<footer className={isShow ? 'footer' : 'footer_hidden'}>
      <p className="footer__copyright">
        &copy; 2020 Дмитрий Прокопьев
      </p>
    </footer>
  );
}
