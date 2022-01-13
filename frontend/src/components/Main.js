import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function Main(props) {

  const { onCardClick, onEditAvatarClick, onEditProfileClick, onAddPlaceClick, handleCardLike,
    handleCardDelete, cards } = props;

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <div className="page">
      <section className="profile">
        <div className="profile__image-container">
          <img src={currentUser.avatar} alt={currentUser.name} className="profile__image" />
          <button className="profile__button profile__button_type_image"
            onClick={onEditAvatarClick} />
        </div>
        <div className="profile__info">
          <div className="profile__inner">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button aria-label="edit" type="button" className="profile__button profile__button-hover profile__button_type_edit"
              onClick={onEditProfileClick} />
          </div>
          <p className="profile__description" >{currentUser.about}</p>
        </div>
        <button aria-label="add" type="button" className="profile__button profile__button-hover profile__button_type_add"
          onClick={onAddPlaceClick}
        />
      </section>
      <section className="cards">
        {cards.map((card) => (
          <Card card={card} onCardClick={onCardClick} key={card._id} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
        ))}
      </section>
    </div>
  )
}

export default Main;
