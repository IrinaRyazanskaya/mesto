const allPopups = document.querySelectorAll('.popup');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');

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

function initHandlers() {
  editButton.addEventListener('click', () => {
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
}

export { initHandlers, openPopup, imagePopup, fillImagePopup };