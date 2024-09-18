// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

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

  return cardElement;
};

function renderCards(cardsData, onDelete) {
  const cardsContainer = document.querySelector('.places__list');

  cardsData.forEach(cardData => {
    const card = createCard(cardData, onDelete);
    cardsContainer.append(card);
  });
}

function handleDelete(cardElement) {
  cardElement.remove();
}

renderCards(initialCards, handleDelete);
