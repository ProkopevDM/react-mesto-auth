import React from 'react';
import {
  Route, Redirect, Switch, useHistory,
} from 'react-router-dom';
import '../index.css';

import Header from './Header';
import Register from './Register';
import Login from './Login';
import Main from './Main';
import ProtectedRoute from './ProtectedRoute';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import CardDeletePopup from './CardDeletePopup';
import Footer from './Footer';
import InfoTooltip from './InfoTooltip';
import ImagePopup from './ImagePopup';
import Spinner from './Spinner';

import api from '../utils/api';
import authMesto from '../utils/authMesto';

import { CurrentUserContext } from '../context/CurrentUserContext';

function App() {
  // Authorization const
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const [authStatus, setAuthStatus] = React.useState('register');
  const [infoTooltip, setInfoTooltip] = React.useState(false);
  const [infoTooltipMessage, setInfoTooltipMessage] = React.useState('');
  const [infoTooltipStatus, setInfoTooltipStatus] = React.useState('');
  const history = useHistory();
  // Rest const
  const [isEditProfilePopupOpen, setEditProfileOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = React.useState(false);
  const [selectedCardDelete, setSelectedCardDelete] = React.useState({});
  const [isPhotoPopupOpen, setPhotoPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isSpinner, setSpinner] = React.useState(false);

  const handleEditAvatarClick = () => setEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setEditProfileOpen(true);
  const handleAddPlaceClick = () => setAddPlacePopupOpen(true);
  const handleDeleteCardClick = (card) => { setSelectedCardDelete(card); setDeleteCardPopupOpen(true); };
  const handleCardClick = (card) => { setSelectedCard(card); setPhotoPopupOpen(true); };
  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfileOpen(false);
    setAddPlacePopupOpen(false);
    setPhotoPopupOpen(false);
    setDeleteCardPopupOpen(false);
    setInfoTooltip(false);
  };

  const checkToken = (token) => {
    setSpinner(true);
    authMesto.checkToken(token)
      .then((res) => {
        setLoggedIn(true);
        setUserEmail(res.data.email);
        history.push('/main');
        api.getAppInfo()
          .then((infoFromServer) => {
            const [userData, cardsData] = infoFromServer;
            setCurrentUser(userData);
            setCards(cardsData);
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setAuthStatus('logout');
        setSpinner(false);
      });
  };

  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      checkToken(token);
    }
  }, []);

  // New user data
  function handleUpdateUser(name, description) {
    setSpinner(true);
    api.patchUserInfo(name, description)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((error) => console.log(error))
      .finally(() => setSpinner(false));
  }

  // New Avatar
  function handleUpdateAvatar(avatar) {
    setSpinner(true);
    api.patchAvatarInfo(avatar)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((error) => console.log(error))
      .finally(() => setSpinner(false));
  }

  // Add card
  function handleCardAdd(card) {
    setSpinner(true);
    api.postCardInfo(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.log(error))
      .finally(() => setSpinner(false));
  }

  // Delete
  function handleCardDelete(card) {
    setSpinner(true);
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((i) => i._id !== card._id);
        setCards(newCards);
        closeAllPopups();
      })
      .catch((error) => console.log(error))
      .finally(() => setSpinner(false));
  }

  // Like
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      setSpinner(true);
      api.likeCard(card._id)
        .then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
          // Обновляем стейт
          setCards(newCards);
        })
        .catch((error) => console.log(error))
        .finally(() => setSpinner(false));
    } else {
      setSpinner(true);
      api.dislikeCard(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
          setCards(newCards);
        })
        .catch((error) => console.log(error))
        .finally(() => setSpinner(false));
    }
  }

  // Close popup
  const handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      closeAllPopups();
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('mousedown', handleEscClose);
    }
  };

  const handleOverlayClose = (evt) => {
    if (evt.target.classList.contains('popup')) {
      closeAllPopups();
      document.removeEventListener('mousedown', handleEscClose);
      document.removeEventListener('keydown', handleEscClose);
    }
  };

  const handleLogin = (data) => {
    setSpinner(true);
    authMesto.userAuthorization(data)
      .then((res) => {
        if (res.token) {
          checkToken(res.token);
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          setAuthStatus('logout');
          history.push('/main');
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setSpinner(false));
  };

  const handleRegister = (data) => {
    setSpinner(true);
    authMesto.userRegistration(data)
      .then((res) => {
        setInfoTooltip(true);
        setInfoTooltipStatus('ok');
        setInfoTooltipMessage('Вы успешно зарегистрировались!');
        history.push('/sign-in');
        setAuthStatus('register');
      })
      .catch((e) => {
        setInfoTooltip(true);
        setInfoTooltipStatus('error');
        setInfoTooltipMessage('Что-то пошло не так! Попробуйте ещё раз.');
        history.push('/sign-in');
      })
      .finally(() => setSpinner(false));
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setAuthStatus('register');
  };

  React.useEffect(() => {
    if (isEditProfilePopupOpen === true
      || isAddPlacePopupOpen === true
      || isEditAvatarPopupOpen === true
      || isDeleteCardPopupOpen === true
      || selectedCardDelete === true
      || isPhotoPopupOpen === true
      || infoTooltip === true) {
      document.addEventListener('keydown', handleEscClose);
      document.addEventListener('mousedown', handleOverlayClose);
    }
  },
  [isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isEditAvatarPopupOpen,
    isDeleteCardPopupOpen,
    selectedCardDelete,
    isPhotoPopupOpen,
    infoTooltip]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <Header
          userEmail={userEmail}
          authStatus={authStatus}
          handleLogout={handleLogout}/>
        <main className="main">
          <Switch>
            <ProtectedRoute
              path="/main"
              isShow={loggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              cards={cards}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteCardClick}
              component={Main}
            />
            <Route path="/sign-up">
              <Register
              onRegister={handleRegister}
              setAuthStatus={setAuthStatus}/>
            </Route>
            <Route path="/sign-in">
              <Login
              onAuthorization={handleLogin}
              setAuthStatus={setAuthStatus}/>
            </Route>
            <Route path="/">
                {loggedIn ? <Redirect to="/main"/> : <Redirect to="/sign-in"/>}
            </Route>
          </Switch>
          <InfoTooltip
            isOpen={infoTooltip}
            onClose={closeAllPopups}
            infoTooltipStatus={infoTooltipStatus}
            infoTooltipMessage={infoTooltipMessage}/>
        </main>
        <Footer
          isShow={loggedIn} />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onCardAdd={handleCardAdd} />
        <CardDeletePopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          selectedCardDelete={selectedCardDelete}
          onCardDelete={handleCardDelete} />
        <ImagePopup
          isOpen={isPhotoPopupOpen}
          card={selectedCard}
          onClose={closeAllPopups} />
        <Spinner isOpen={isSpinner} />
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
