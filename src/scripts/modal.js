const allPopups = document.querySelectorAll('.popup');
const editPopup = document.querySelector('.popup_type_edit');
const imagePopup = document.querySelector('.popup_type_image');

const editFormElement = editPopup.querySelector('.popup__form');
const nameInput = editFormElement.querySelector('.popup__input_type_name');
const jobInput = editFormElement.querySelector('.popup__input_type_description');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(editPopup);
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

export { openPopup, closePopup, imagePopup, fillImagePopup, fillEditForm, handleEditFormSubmit };