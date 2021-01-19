class AuthMesto {
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

  userRegistration(data) {
    return fetch(`${this._baseUrl}/signup`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({ password: data.password, email: data.email }),
    })
      .then((res) => this._getStateServer(res));
  }

  userAuthorization(data) {
    return fetch(`${this._baseUrl}/signin`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({ password: data.password, email: data.email }),
    })
      .then((res) => this._getStateServer(res));
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
		    'Content-Type': 'application/json',
		    Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    })
      .then((res) => this._getStateServer(res));
  }
}

export default new AuthMesto({
  url: 'https://auth.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json',
  },
});
