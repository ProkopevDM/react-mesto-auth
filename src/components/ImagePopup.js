import React from 'react';

export default function ImagePopup({card, onClose}) {
	return (
		<div className={`popup popup_type_photo-fullscreen ${card && 'popup_opened'}`}>
	    <div className={`popup__container-fullscreen ${card && 'popup_opened'}`}>
	      <button type="button" className="popup__button-close" onClick={onClose}/>
	      <img src={card.link} alt={card.name} className="popup__photo-fullscreen" />
	      <h3 className="popup__photo-fullscreen-title">{card.name}</h3>
	    </div>
	  </div>
	);
}