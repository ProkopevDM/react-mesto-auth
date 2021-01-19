import React from 'react';
import okAuth from '../images/okAuth.svg';
import errorAuth from '../images/errorAuth.svg';

export default function InfoTooltip({
  isOpen, infoTooltipStatus, infoTooltipMessage, onClose,
}) {
  return (
		<div className={isOpen ? 'popup popup_opened' : 'popup'}>
			<div className="popup__container popup__container_flex-column">
				<button type="button" className="popup__button-close" onClick={onClose}/>
				<img src={infoTooltipStatus === 'ok' ? okAuth : errorAuth} alt={infoTooltipStatus === 'ok' ? 'Успешно' : 'Ошибка'} className="popup__auth-image-status"/>
				<span className="popup__auth-text">{infoTooltipMessage}</span>
	    </div>
	  </div>
  );
}
