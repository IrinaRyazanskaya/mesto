const config = {
  baseUrl: "https://nomoreparties.co/v1/pwff-cohort-1",
  headers: {
    authorization: "ae2e6766-97db-4f08-b0fd-1ef973641b71",
    "Content-Type": "application/json",
  },
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

function getUserInformationRequest() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.headers.authorization,
    },
  }).then((res) => {
    return checkResponse(res);
  });
}

function getInitialCardsRequest() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.headers.authorization,
    },
  }).then((res) => {
    return checkResponse(res);
  });
}

function updateUserInfoRequest(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
    body: JSON.stringify({
      name,
      about,
    }),
  }).then((res) => {
    return checkResponse(res);
  });
}

function addNewCardRequest(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
    body: JSON.stringify({
      name,
      link,
    }),
  }).then((res) => {
    return checkResponse(res);
  });
}

function deleteCardRequest(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: config.headers.authorization,
    },
  }).then((res) => {
    return checkResponse(res);
  });
}

function putLikeRequest(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: config.headers.authorization,
    },
  }).then((res) => {
    return checkResponse(res);
  });
}

function deleteLikeRequest(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: config.headers.authorization,
    },
  }).then((res) => {
    return checkResponse(res);
  });
}

function updateAvatarRequest(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
    body: JSON.stringify({
      avatar,
    }),
  }).then((res) => {
    return checkResponse(res);
  });
}

export {
  getUserInformationRequest,
  getInitialCardsRequest,
  updateUserInfoRequest,
  addNewCardRequest,
  deleteCardRequest,
  putLikeRequest,
  deleteLikeRequest,
  updateAvatarRequest,
};
