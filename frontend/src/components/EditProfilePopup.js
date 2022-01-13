import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {

  const { isOpen, onClose, onUpdateUser } = props

  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name || '');
    setDescription(currentUser.about || '');
  }, [currentUser, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  function handleInputNameChange(e) {
    setName(e.target.value);
  }

  function handleInputDescriptionChange(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm name="edit" title="Edit profile" submitText="Save"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <label className="popup__input-label">
        <input
          className="popup__input popup__input_content_name" type="text"
          name="name" id="input-name" placeholder="Name"
          minLength={2} maxLength={40} required value={name} onChange={handleInputNameChange}
        />
        <span className="popup__input-error input-name-error"></span>
      </label>
      <label className="popup__input-label">
        <input
          className="popup__input popup__input_content_description" type="text"
          name="about" id="input-description" placeholder="Job"
          minLength={2} maxLength={200} required value={description} onChange={handleInputDescriptionChange}
        />
        <span className="popup__input-error input-description-error" ></span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
