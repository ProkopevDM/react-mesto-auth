class Api {
  constructor(config) {
    this._baseUrl = config.url;
    this._headers = config.headers;
  }

  _getStateServer(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getAppInfo() {
    return Promise.all([
      this.getUserInfo(),
      this.getCardsFromServer(),
    ]);
  }

  getCardsFromServer() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: 'GET',
    })
      .then((res) => this._getStateServer(res));
  }

  postCardInfo(inputValues) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({ name: inputValues.name, link: inputValues.link }),
    })
      .then((res) => this._getStateServer(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then((res) => this._getStateServer(res));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: 'GET',
    })
      .then((res) => this._getStateServer(res));
  }

  patchUserInfo(name, description) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({ name, about: description }),
    })
      .then((res) => this._getStateServer(res));
  }

  patchAvatarInfo(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(data),
    })
      .then((res) => this._getStateServer(res));
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      headers: this._headers,
      method: 'PUT',
    })
      .then((res) => this._getStateServer(res));
  }

  dislikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then((res) => this._getStateServer(res));
  }
}

export default new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: '2898ad1c-4456-4857-a6ce-22f1f08bf45a',
    'Content-Type': 'application/json',
  },
});
