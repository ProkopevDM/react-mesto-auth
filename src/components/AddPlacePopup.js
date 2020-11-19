import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({isOpen, onClose, onCardAdd}) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onCardAdd({ name, link })
  };

  return (
    <PopupWithForm name='addElementForm' title='Новое место' buttonText='Создать' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input onChange={handleNameChange} name="name" type="text" id="place-input" className="popup__input popup__input_type_place" placeholder="Название" minLength="1" maxLength="30" required autoComplete="off" />
      <span id="place-input-error" className="place-input-error" />
      <input onChange={handleLinkChange} name="link" type="URL" id="url-input" className="popup__input popup__input_type_url" placeholder="Ссылка на картинку" required autoComplete="off" />
      <span id="url-input-error" className="url-input-error" />
    </PopupWithForm>
    )
}