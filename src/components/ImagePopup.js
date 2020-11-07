import React from 'react';

export default function ImagePopup({card, isOpen, onClose}) {
	return (
		<div className={isOpen && card? "popup popup_type_photo-fullscreen popup_opened" : "popup popup_type_photo-fullscreen"}>
	    <div className="popup__container-fullscreen">
	      <button type="button" className="popup__button-close" onClick={onClose} />
	      <img src={card.link} alt={card.name} className="popup__photo-fullscreen" />
	      <h3 className="popup__photo-fullscreen-title">{card.name}</h3>
	    </div>
	  </div>
	);
}