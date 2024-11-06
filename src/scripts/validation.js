function showInputError(settings, formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
}

function hideInputError(settings, formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
}

function clearValidation(settings, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  inputList.forEach(inputElement => hideInputError(settings, formElement, inputElement));
  buttonElement.classList.add(settings.inactiveButtonClass);
}

function validateInput(inputElement) {
  if (inputElement.type === 'url') {
    return;
  }

  if (inputElement.value === '') {
    return;
  }

  const regex = /^[a-zA-Zа-яА-ЯёЁ\s\-]+$/;
  const errorMessage = inputElement.getAttribute('data-error-message');

  if (!regex.test(inputElement.value)) {
    inputElement.setCustomValidity(errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }
}

function checkInputValidity(settings, formElement, inputElement) {
  validateInput(inputElement);

  if (!inputElement.validity.valid) {
    showInputError(settings, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(settings, formElement, inputElement);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(settings, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
}

function setEventListeners(settings, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  toggleButtonState(settings, inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(settings, formElement, inputElement);
      toggleButtonState(settings, inputList, buttonElement);
    });
  });
}

function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(settings, formElement);
  });
}

export { enableValidation, clearValidation };
