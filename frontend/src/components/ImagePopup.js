import React from "react";

function ImagePopup(props) {

  const { isOpen, onClose, card } = props

  return (
    <div className={`popup popup_type_image ${isOpen && 'popup_visible'}`}>
      <div className="popup__container">
        <button aria-label="exit" type="button" className="popup__exit-button popup__exit-image" onClick={onClose} />
        <figure className="popup__figure">
          <img className="popup__figure-image" src={card.link} alt={card.name} />
          <figcaption className="popup__figure-caption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  )
}

export default ImagePopup;
