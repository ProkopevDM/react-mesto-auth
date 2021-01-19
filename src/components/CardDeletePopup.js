import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function CardDeletePopup({
  isOpen, onClose, selectedCardDelete, onCardDelete,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onCardDelete(selectedCardDelete);
  };

  return (
    <PopupWithForm
    	name='delete-card'
    	title='Вы уверены?'
    	buttonText='Да'
    	isOpen={isOpen}
    	onClose={onClose}
    	onSubmit={handleSubmit}/>
  );
}
