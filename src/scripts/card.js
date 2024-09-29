import { openPopup, imagePopup, fillImagePopup } from './modal';

function createCard(cardData, onDelete) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const imageElement = cardElement.querySelector('.card__image');
  const titleElement = cardElement.querySelector('.card__title');
  const deleteButtonElement = cardElement.querySelector('.card__delete-button');

  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;
  titleElement.textContent = cardData.name;

  deleteButtonElement.addEventListener('click', () => {
    onDelete(cardElement);
  });

  imageElement.addEventListener('click', () => {
    fillImagePopup(cardData);
    openPopup(imagePopup);
  });

  return cardElement;
};

function handleDelete(cardElement) {
  cardElement.remove();
}

export { createCard, handleDelete };