import './pages/index.css';
import { initialCards } from './scripts/cards';
import { openPopup, closePopup, fillEditForm, handleEditFormSubmit, handleNewCardSubmit } from './scripts/modal';
import { createCard, handleDelete } from './scripts/card';

const cardsContainer = document.querySelector('.places__list');

const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');

const allPopups = document.querySelectorAll('.popup');
const addPopup = document.querySelector('.popup_type_new-card');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');

const editFormElement = editPopup.querySelector('.popup__form');
const newCardFormElement = newCardPopup.querySelector('.popup__form');

function renderCards(cardsData, onDelete) {
  cardsData.forEach(cardData => {
    const card = createCard(cardData, onDelete);
    cardsContainer.append(card);
  });
}

renderCards(initialCards, handleDelete);

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