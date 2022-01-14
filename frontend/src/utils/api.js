class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _customFetch = (baseUrl, headers) =>
    fetch(baseUrl, headers)
      .then(res => res.ok ? res.json() : Promise.reject(res.statusText))

  getInitialCards() {
    return this._customFetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
  }

  getUserinfo() {
    return this._customFetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
  }

  updateUserInfo(data) {
    return this._customFetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
  }

  createCard(data) {
    return this._customFetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  deleteCard(cardId) {
    return this._customFetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE'
    })
  }

  changeLikeCardStatus(cardId, isLiked) {
    return this._customFetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      headers: this._headers,
      method: isLiked ? 'PUT' : 'DELETE'
    })
  }

  setUserAvatar({ avatar }) {
    return this._customFetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({ avatar })
    })
  }
}

const api = new Api({
  baseUrl: "https://api.saappir.students.nomoreparties.sbs",
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  }
});

export default api;
