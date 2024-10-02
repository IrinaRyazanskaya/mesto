import './pages/index.css';
import { initialCards } from './scripts/cards';
import { openPopup, closePopup } from './scripts/modal';
import { createCard, deleteCard, toggleLike } from './scripts/card';

const cardsContainer = document.querySelector('.places__list');

const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');

const allPopups = document.querySelectorAll('.popup');
const addPopup = document.querySelector('.popup_type_new-card');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const editFormElement = editPopup.querySelector('.popup__form');
const nameInput = editFormElement.querySelector('.popup__input_type_name');
const jobInput = editFormElement.querySelector('.popup__input_type_description');

const newCardFormElement = newCardPopup.querySelector('.popup__form');
const titleInput = newCardFormElement.querySelector('.popup__input_type_card-name');
const linkInput = newCardFormElement.querySelector('.popup__input_type_url');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const popupImage = imagePopup.querySelector('.popup__image');
const imageCaption = imagePopup.querySelector('.popup__caption');

function fillImagePopup(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  imageCaption.textContent = cardData.name;
}

function openImagePopup(cardData) {
  return () => {
    fillImagePopup(cardData);
    openPopup(imagePopup);
  };
}

function renderCards(cardsData) {
  cardsData.forEach(cardData => {
    const imageClickHandler = openImagePopup(cardData);
    const card = createCard(cardData, deleteCard, toggleLike, imageClickHandler);
    cardsContainer.append(card);
  });
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(editPopup);
}

function handleNewCardSubmit(evt) {
  evt.preventDefault();

  const name = titleInput.value;
  const link = linkInput.value;
  const cardData = { name, link };

  const imageClickHandler = openImagePopup(cardData);
  const card = createCard(cardData, deleteCard, toggleLike, imageClickHandler);

  closePopup(newCardPopup);
  
  newCardFormElement.reset();

  cardsContainer.prepend(card);
}

function fillEditForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

renderCards(initialCards);

editButton.addEventListener('click', () => {
  fillEditForm();
  openPopup(editPopup);
});

addButton.addEventListener('click', () => {
  openPopup(addPopup);
});

allPopups.forEach(popup => {
  popup.addEventListener('click', evt => {
    if (evt.target.classList.contains('popup')) {
      closePopup(popup);
    }

    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
});  

editFormElement.addEventListener('submit', handleEditFormSubmit); 
newCardFormElement.addEventListener('submit', handleNewCardSubmit);