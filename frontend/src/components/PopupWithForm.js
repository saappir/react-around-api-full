import React from 'react';

function PopupWithForm(props) {

  const { isOpen, name, title, onClose, children, submitText, onSubmit } = props;

  return (
    <section className={`popup popup_type_${name}, ${isOpen && 'popup_visible'}`} >
      <div className="popup__container">
        <button
          aria-label="exit"
          type="button"
          className="popup__exit-button"
          onClick={onClose}
        />
        <form className={`popup__form popup__${name}-form`} onSubmit={onSubmit}>
          <h2 className="popup__title">{title}</h2>
          {children}
          <button type="submit" className="popup__submit-button">
            {submitText}
          </button>
        </form>
      </div>
    </section>
  )
}

export default PopupWithForm;
