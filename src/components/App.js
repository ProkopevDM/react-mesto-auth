import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';

function App() {
  const [isEditProfilePopupOpen, setEditProfileOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = React.useState(false);
  const [isPhotoPopupOpen, setPhotoPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const handleEditAvatarClick = () => setEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setEditProfileOpen(true);
  const handleAddPlaceClick = () => setAddPlacePopupOpen(true);
  const handleDeleteCardClick = () => setDeleteCardPopupOpen(true);
  const handleCardClick = (card) => {setSelectedCard(card); setPhotoPopupOpen(true)};
  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfileOpen(false);
    setAddPlacePopupOpen(false);
    setPhotoPopupOpen(false);
    setDeleteCardPopupOpen(false);
  }

  React.useEffect(() => {
    api.getAppInfo()
    .then((infoFromServer) => {
      const [userData, cardsData] = infoFromServer;
      setCurrentUser(userData);
      setCards(cardsData);
    })
    .catch((error) => console.log(error))
  }, []); 

  return (
    <>
      <Header />
      <Main onEditProfile={handleEditProfileClick}
       onAddPlace={handleAddPlaceClick}
       onEditAvatar={handleEditAvatarClick} 
       infoUser={currentUser}
       arrayCard={cards}
       onCardClick={handleCardClick}
       onCardClickDelete={handleDeleteCardClick}/>
      <Footer />
      <PopupWithForm name='edit-avatar' title='Обновить автар' buttonText='Сохранить' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <input name="avatar" type="URL" id="url-input_avatar" className="popup__input popup__input_type_url" placeholder="Ссылка на картинку" required autoComplete="off" />
        <span id="url-input_avatar-error" className="url-input-error" />
      </PopupWithForm>
      <PopupWithForm name='edit-profile' title='Редактировать профиль' buttonText='Сохранить' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <input name="name" type="text" id="name-input" className="popup__input popup__input_field_name" placeholder="Имя" minLength="2" maxLength="40" required autoComplete="off" />
        <span id="name-input-error" className="name-input-error" />
        <input name="job" type="text" id="profession-input" className="popup__input popup__input_field_profession" placeholder="Занятие" minLength="2" maxLength="200" required autoComplete="off" />
        <span id="profession-input-error" className="profession-input-error" />
      </PopupWithForm>
      <PopupWithForm name='add-element' title='Новое место' buttonText='Создать' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <input name="name" type="text" id="place-input" className="popup__input popup__input_type_place" placeholder="Название" minLength="1" maxLength="30" required autoComplete="off" />
        <span id="place-input-error" className="place-input-error" />
        <input name="link" type="URL" id="url-input" className="popup__input popup__input_type_url" placeholder="Ссылка на картинку" required autoComplete="off" />
        <span id="url-input-error" className="url-input-error" />
      </PopupWithForm>
      <PopupWithForm name='delete-card' title='Вы уверены?' buttonText='Да' isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} />
      <ImagePopup isOpen={isPhotoPopupOpen} card={selectedCard} onClose={closeAllPopups} />
    </>
  );
}

export default App;