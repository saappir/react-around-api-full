import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

  const { isOpen, onClose, onUpdateAvatar } = props;

  const imageInput = React.useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: imageInput.current.value
    });
  }

  return (
    <PopupWithForm name="image" title="Update profile picture" submitText="Save" isOpen={isOpen}
      onClose={onClose} onSubmit={handleSubmit}>
      <label className="popup__input-label">
        <input className="popup__input popup__input_content_profile-image" type="url" name="link" id="input-avatar"
          placeholder="Image link" required
           ref={imageInput} />
        <span className="popup__input-error input-avatar-error" />
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
