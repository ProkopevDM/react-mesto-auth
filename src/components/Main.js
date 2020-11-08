import React from 'react';
import Card from './Card';

export default function Main({onEditProfile, onAddPlace, onEditAvatar, infoUser, arrayCard, onCardClick, onCardClickDelete}) {
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar">
          <img src={infoUser.avatar} alt="Аватар" className="profile__avatar-image" />
          <button type="button" className="profile__button-change-avatar" onClick={onEditAvatar} />
        </div>
        <div className="profile__info">
          <div className="profile__wrapper">
          <h1 className="profile__name">{infoUser.name}</h1>
            <button type="button" className="profile__button-edit" onClick={onEditProfile} />
          </div>
          <p className="profile__profession">{infoUser.about}</p>
        </div>
        <button type="button" className="profile__button-add" onClick={onAddPlace} />
      </section>
      <ul className="elements">
        {
          arrayCard.map((card) => 
          (<Card cardData={card} key={card._id} onCardClick={onCardClick} onCardClickDelete={onCardClickDelete} />)
        )}
      </ul>
    </main>
	);
}