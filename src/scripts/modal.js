const allPopups = document.querySelectorAll('.popup');
const imagePopup = document.querySelector('.popup_type_image');

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
};