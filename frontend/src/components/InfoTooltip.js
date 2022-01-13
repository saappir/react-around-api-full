import React from 'react';
import failIcon from '../images/icons/fail.svg';
import successIcon from '../images/icons/confirm.svg';

function InfoTooltip(props) {
  const { onClose, isOpen } = props
  const successText = 'Success! You have now been registered.';
  const failText = 'Oops, something went wrong! Please try again.';

  return (
    <div className={`popup popup_type_confirm ${isOpen && 'popup_visible'}`}>
      <div className="popup__container">
        <div className='popup__form'>
          <button aria-label="exit" type="button" className="popup__exit-button popup__exit-image" onClick={onClose} />
          <img className='popup__icon' alt='confirm-icon' src={props.message ? successIcon : failIcon} />
          <p className='popup__icon-text'>{props.message ? successText : failText}</p>
        </div>
      </div>
    </div >
  )
}

export default InfoTooltip;
