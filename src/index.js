import './pages/index.css';
import { openPopup, closePopup } from './scripts/modal';
import { createCard, deleteCard, toggleLike } from './scripts/card';
import { enableValidation, clearValidation, deactivateButton } from './scripts/validation';
import { 
  getUserInformationRequest, 
  getInitialCardsRequest, 
  updateUserInfoRequest, 
  addNewCardRequest,
  updateAvatarRequest,
  deleteCardRequest,
} from './scripts/api';

let currentUserID = null;

const formSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const cardsContainer = document.querySelector('.places__list');

const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const changeAvatarButton = document.querySelector('.profile__edit-image');

const allPopups = document.querySelectorAll('.popup');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const changeAvatarPopup = document.querySelector('.popup_change-avatar');

const editFormElement = editPopup.querySelector('.popup__form');
const nameInput = editFormElement.querySelector('.popup__input_type_name');
const jobInput = editFormElement.querySelector('.popup__input_type_description');
const saveButtonEditForm = editFormElement.querySelector('.popup__button');

const newCardFormElement = newCardPopup.querySelector('.popup__form');
const titleInput = newCardFormElement.querySelector('.popup__input_type_card-name');
const linkInput = newCardFormElement.querySelector('.popup__input_type_url');
const saveButtonAddForm = newCardFormElement.querySelector('.popup__button');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

const popupImage = imagePopup.querySelector('.popup__image');
const imageCaption = imagePopup.querySelector('.popup__caption');

const changeAvatarFormElement = changeAvatarPopup.querySelector('.popup__form');
const avatarLinkInput = changeAvatarFormElement.querySelector('.popup__input_type_url');
const saveButtonAvatarForm = changeAvatarFormElement.querySelector('.popup__button');

const confirmDeletePopup = document.querySelector('.popup_type_confirm-delete');
const confirmDeleteButton = confirmDeletePopup.querySelector('.popup__button');

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
    const card = createCard(
      cardData, 
      currentUserID, 
      handleDeleteCard,
      toggleLike, 
      openImagePopup(cardData)
    );
    cardsContainer.append(card);
  });
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  saveButtonEditForm.textContent = 'Сохранение...';
  deactivateButton(saveButtonEditForm, formSettings);

  updateUserInfoRequest(
    nameInput.value,
    jobInput.value
  )
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;

      closePopup(editPopup);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      saveButtonEditForm.textContent = 'Сохранить';
    });
}

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  saveButtonAddForm.textContent = 'Сохранение...';
  deactivateButton(saveButtonAddForm, formSettings);

  addNewCardRequest(
    titleInput.value,
    linkInput.value
  )
    .then((cardData) => {
      const card = createCard(
        cardData, 
        currentUserID, 
        handleDeleteCard, 
        toggleLike, 
        openImagePopup(cardData)
      );

      closePopup(newCardPopup);

      newCardFormElement.reset();
      clearValidation(formSettings, newCardFormElement);
    
      cardsContainer.prepend(card);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      saveButtonAddForm.textContent = 'Сохранить';
    });
}

function handleChangeAvatarSubmit(evt) {
  evt.preventDefault();
  saveButtonAvatarForm.textContent = 'Сохранение...';
  deactivateButton(saveButtonAvatarForm, formSettings);

  updateAvatarRequest(
    avatarLinkInput.value
  )
    .then((data) => {
      profileAvatar.style.backgroundImage = `url(${data.avatar})`;

      closePopup(changeAvatarPopup);

      changeAvatarFormElement.reset();
      clearValidation(formSettings, changeAvatarFormElement);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      saveButtonAvatarForm.textContent = 'Сохранить';
    });
}

function handleDeleteCard(cardElement, cardId) {
  openPopup(confirmDeletePopup);

  confirmDeleteButton.onclick = () => {
    deleteCardRequest(cardId)
      .then(() => {
        deleteCard(cardElement);
        closePopup(confirmDeletePopup);
      })
      .catch((error) => {
        console.error(error);
      });
  };
}

function fillEditForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formSettings, editFormElement);
}

function renderUserInformation(userInfo) {
  profileName.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
}

editButton.addEventListener('click', () => {
  fillEditForm();
  openPopup(editPopup);
});

addButton.addEventListener('click', () => {
  openPopup(newCardPopup);
});

changeAvatarButton.addEventListener('click', () => {
  openPopup(changeAvatarPopup);
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
changeAvatarFormElement.addEventListener('submit', handleChangeAvatarSubmit);

enableValidation(formSettings); 

Promise.all([getUserInformationRequest(), getInitialCardsRequest()])
  .then(([profileResponse, cardsResponse]) => {
    currentUserID = profileResponse._id;

    renderUserInformation(profileResponse);
    renderCards(cardsResponse);
  })
  .catch((error) => {
    console.error(error);
  });
