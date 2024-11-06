import { openPopup, closePopup } from "./modal";
import { config, deleteCardRequest, putLikeRequest, deleteLikeRequest } from "./api";

const cardTemplate = document.querySelector('#card-template').content;

function createCard(cardData, currentUserID, onDelete, onLike, onImageClick) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const imageElement = cardElement.querySelector('.card__image');
  const titleElement = cardElement.querySelector('.card__title');
  const deleteButtonElement = cardElement.querySelector('.card__delete-button');
  const likeButtonElement = cardElement.querySelector('.card__like-button');
  const likeCounterElement = cardElement.querySelector('.card__like-counter');

  const confirmDeletePopup = document.querySelector('.popup_type_confirm-delete');
  const confirmDeleteButton = confirmDeletePopup.querySelector('.popup__button');

  const likes = cardData.likes;

  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;
  titleElement.textContent = cardData.name;
  likeCounterElement.textContent = cardData.likes.length;

  if (cardData.owner._id !== currentUserID) {
    deleteButtonElement.classList.add('card__delete-button_inactive');
  }

  likes.forEach(like => {
    const userLike = like._id;

    if (userLike === currentUserID) {
      likeButtonElement.classList.add('card__like-button_is-active');
    }
  });

  deleteButtonElement.addEventListener('click', () => {
    openPopup(confirmDeletePopup);

    confirmDeleteButton.onclick = () => {
      onDelete(cardElement, cardData._id);
      closePopup(confirmDeletePopup);
    };
  });

  likeButtonElement.addEventListener('click', () => {
    onLike(likeButtonElement, likeCounterElement, cardData._id);
  });
  
  imageElement.addEventListener('click', onImageClick);

  return cardElement;
};

function deleteCard(cardElement, cardId) {
  deleteCardRequest(config, cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((error) => {
      console.error(error);
    })
}

function toggleLike(likeButton, likeCounter, cardId) {
  if (likeButton.classList.contains('card__like-button_is-active')) {
    deleteLikeRequest(config, cardId)
      .then((cardData) => {
        likeCounter.textContent = cardData.likes.length;
        likeButton.classList.remove('card__like-button_is-active');
      })
      .catch((error) => {
        console.error(error);
      })
  } else {
    putLikeRequest(config, cardId)
      .then((cardData) => {
        likeCounter.textContent = cardData.likes.length;
        likeButton.classList.add('card__like-button_is-active');
      })
      .catch((error) => {
        console.error(error);
      })
  }
}

export { createCard, deleteCard, toggleLike };
