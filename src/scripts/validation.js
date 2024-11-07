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
  deactivateButton(buttonElement, settings);
}

function validateInput(inputElement) {
  if (inputElement.validity.patternMismatch) {
    return inputElement.getAttribute('data-error-message');
  }

  if (!inputElement.validity.valid) {
    return inputElement.validationMessage;
  }
}

function checkInputValidity(settings, formElement, inputElement) {
  const errorMessage = validateInput(inputElement);
  
  if (!inputElement.validity.valid) {
    showInputError(settings, formElement, inputElement, errorMessage);
  } else {
    hideInputError(settings, formElement, inputElement);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function deactivateButton(buttonElement, settings) {
  buttonElement.classList.add(settings.inactiveButtonClass);
  buttonElement.disabled = true;
}

function toggleButtonState(settings, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    deactivateButton(buttonElement, settings);
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false;
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

export { enableValidation, clearValidation, deactivateButton };
