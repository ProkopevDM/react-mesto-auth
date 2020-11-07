import React from 'react';

export default function Card({cardData, onCardClick, onCardClickDelete}) {
	const {name, link, likes} = cardData;

	function handleClick() {
    onCardClick(cardData);
  }

	return (
		<li className="element">
  	  <button type="button" className="element__button-delete" onClick={onCardClickDelete} />
    	<img src={link} alt={name} className="element__photo" onClick={handleClick} />
  	  <div className="element__info">
  	  <h2 className="element__place">{name}</h2>
  	    <div className="element__like">
  	      <button type="button" className="element__button-like" />
  	      <span className="element__liked">{likes.length}</span>
  	    </div>
  	  </div>
  	</li>
	);
}