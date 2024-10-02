const cardTemplate = document.querySelector('#card-template').content;

function createCard(cardData, onDelete, onLike, onImageClick) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const imageElement = cardElement.querySelector('.card__image');
  const titleElement = cardElement.querySelector('.card__title');
  const deleteButtonElement = cardElement.querySelector('.card__delete-button');
  const likeButtonElement = cardElement.querySelector('.card__like-button');

  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;
  titleElement.textContent = cardData.name;

  deleteButtonElement.addEventListener('click', onDelete);
  likeButtonElement.addEventListener('click', onLike);
  imageElement.addEventListener('click', onImageClick);

  return cardElement;
};

function deleteCard(evt) {
  evt.target.parentElement.remove();
}

function toggleLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, toggleLike };
