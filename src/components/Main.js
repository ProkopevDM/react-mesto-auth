import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../context/CurrentUserContext';

export default function Main({
  onEditProfile, onAddPlace, onEditAvatar, cards, onCardClick, onCardLike, onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <section className="profile">
        <div className="profile__avatar">
          <img src={currentUser.avatar} alt="Аватар" className="profile__avatar-image" />
          <button type="button" className="profile__button-change-avatar" onClick={onEditAvatar} />
        </div>
        <div className="profile__info">
          <div className="profile__wrapper">
          <h1 className="profile__name">{currentUser.name}</h1>
            <button type="button" className="profile__button-edit" onClick={onEditProfile} />
          </div>
          <p className="profile__profession">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__button-add" onClick={onAddPlace} />
      </section>
      <ul className="elements">
        {
          cards.map((card) => (<Card cardData={card} key={card._id} onCardClick={onCardClick} onCardClickDelete={onCardDelete} onCardClickLike={onCardLike} />))}
      </ul>
    </>
  );
}
