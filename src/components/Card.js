import React from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';

export default function Card({cardData, onCardClick, onCardClickLike, onCardClickDelete}) {
	const {name, link, likes, owner} = cardData;
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = likes.some(i => i._id === currentUser._id);

	function handleClick() {
    onCardClick(cardData);
  }

  function handleClickLike() {
    onCardClickLike(cardData);
  }

  function handleClickDelete() {
    onCardClickDelete(cardData);
  }

	return (
		<li className="element">
  	  <button type="button" className={isOwn? "element__button-delete" : "element__button-delete element__button-delete_hidden"} onClick={handleClickDelete} />
    	<img src={link} alt={name} className="element__photo" onClick={handleClick} />
  	  <div className="element__info">
  	  <h2 className="element__place">{name}</h2>
  	    <div className="element__like">
  	      <button type="button" className={isLiked? "element__button-like element__button-like_active" : "element__button-like"} onClick={handleClickLike} />
  	      <span className="element__liked">{likes.length}</span>
  	    </div>
  	  </div>
  	</li>
	);
}