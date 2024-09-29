import { createCard, handleDelete } from './card';

const cardsContainer = document.querySelector('.places__list');

const allPopups = document.querySelectorAll('.popup');
const editPopup = document.querySelector('.popup_type_edit');
const imagePopup = document.querySelector('.popup_type_image');
const newCardPopup = document.querySelector('.popup_type_new-card');

const editFormElement = editPopup.querySelector('.popup__form');
const nameInput = editFormElement.querySelector('.popup__input_type_name');
const jobInput = editFormElement.querySelector('.popup__input_type_description');

const newCardFormElement = newCardPopup.querySelector('.popup__form');
const titleInput = newCardFormElement.querySelector('.popup__input_type_card-name');
const linkInput = newCardFormElement.querySelector('.popup__input_type_url');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

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

  const card = createCard({ name, link }, handleDelete);
  cardsContainer.prepend(card);

  titleInput.value = '';
  linkInput.value = '';

  closePopup(newCardPopup);
}

function fillEditForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

function escapeHandler(evt) {
  if (evt.key === 'Escape') {
    allPopups.forEach(popup => {
      closePopup(popup);
    })
  }
}

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', escapeHandler);
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', escapeHandler);
}

function fillImagePopup(cardData) {
  const popupImage = imagePopup.querySelector('.popup__image');
  const imageCaption = imagePopup.querySelector('.popup__caption');

  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  imageCaption.textContent = cardData.name;
}

export { 
  openPopup, 
  closePopup, 
  imagePopup, 
  fillImagePopup, 
  fillEditForm, 
  handleEditFormSubmit, 
  handleNewCardSubmit, 
};