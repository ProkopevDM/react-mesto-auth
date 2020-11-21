import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../context/CurrentUserContext';

export default function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
	const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(name, description);
  };

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
	  <PopupWithForm name='editProfileForm' title='Редактировать профиль' buttonText='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
		  <input onChange={handleNameChange} value={name || ''} name="name" type="text" id="name-input" className="popup__input popup__input_field_name" placeholder="Имя" minLength="2" maxLength="40" required autoComplete="off" />
		  <span id="name-input-error" className="name-input-error" />
		  <input onChange={handleDescriptionChange} value={description || ''} name="job" type="text" id="profession-input" className="popup__input popup__input_field_profession" placeholder="Занятие" minLength="2" maxLength="200" required autoComplete="off" />
		  <span id="profession-input-error" className="profession-input-error" />
		</PopupWithForm>
	)
}