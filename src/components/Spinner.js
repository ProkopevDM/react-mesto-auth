import React from 'react';

export default function Spiner({ isOpen }) {
  return (
		<div className={isOpen ? 'spinner' : 'spinner spinner_hidden'}>
			<div></div>
		</div>
  );
}
