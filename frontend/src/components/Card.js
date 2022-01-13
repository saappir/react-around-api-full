import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {

  const { onCardClick, card, onCardLike, onCardDelete } = props;

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `card__delete-button ${isOwn ? 'card__delete-button_state_visible' : 'card__delete-button_state_hidden'}`
  );

  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `card__like-button ${isLiked && 'card__like-button_state_active'}`
  )

  const handleClick = () => {
    onCardClick(card);
  }

  const handleCardLike = () => {
    onCardLike(card)
  }

  const handleDeleteClick = () => {
    onCardDelete(card)
  }

  return (
    <article className="card">
      <button
        aria-label="delete"
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick} />
      <img
        src={card.link}
        alt={card.name}
        className="card__image"
        onClick={handleClick} />
      <div className="card__inner">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__likes-container">
          <button
            aria-label="like"
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleCardLike} />
          <span className="card__likes-count">{card.likes.length}</span>
        </div>
      </div>
    </article>
  )
}

export default Card;
