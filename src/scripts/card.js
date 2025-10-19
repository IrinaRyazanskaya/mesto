import { putLikeRequest, deleteLikeRequest } from "./api";

function createCard(cardData, currentUserID, onDelete, onLike, onImageClick) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const imageElement = cardElement.querySelector(".card__image");
  const titleElement = cardElement.querySelector(".card__title");
  const deleteButtonElement = cardElement.querySelector(".card__delete-button");
  const likeButtonElement = cardElement.querySelector(".card__like-button");
  const likeCounterElement = cardElement.querySelector(".card__like-counter");

  const likes = cardData.likes;

  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;
  titleElement.textContent = cardData.name;
  likeCounterElement.textContent = cardData.likes.length;

  if (cardData.owner._id !== currentUserID) {
    deleteButtonElement.classList.add("card__delete-button_inactive");
  }

  likes.forEach((like) => {
    const userLike = like._id;

    if (userLike === currentUserID) {
      likeButtonElement.classList.add("card__like-button_is-active");
    }
  });

  deleteButtonElement.addEventListener("click", () => onDelete(cardElement, cardData._id));
  likeButtonElement.addEventListener("click", () =>
    onLike(likeButtonElement, likeCounterElement, cardData._id),
  );
  imageElement.addEventListener("click", onImageClick);

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function toggleLike(likeButton, likeCounter, cardId) {
  if (likeButton.classList.contains("card__like-button_is-active")) {
    deleteLikeRequest(cardId)
      .then((cardData) => {
        likeCounter.textContent = cardData.likes.length;
        likeButton.classList.remove("card__like-button_is-active");
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    putLikeRequest(cardId)
      .then((cardData) => {
        likeCounter.textContent = cardData.likes.length;
        likeButton.classList.add("card__like-button_is-active");
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export { createCard, deleteCard, toggleLike };
