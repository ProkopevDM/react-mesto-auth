import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };

  return (
	  <PopupWithForm name='editAvatarForm' title='Обновить автар' buttonText='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input ref={avatarRef} name="avatar" type="URL" id="url-input_avatar" className="popup__input popup__input_type_url" placeholder="Ссылка на картинку" required autoComplete="off" />
      <span id="url-input_avatar-error" className="url-input-error" />
    </PopupWithForm>
  );
}
