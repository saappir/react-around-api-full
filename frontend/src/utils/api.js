class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _customFetch = (baseUrl, headers) =>
    fetch(baseUrl, headers)
      .then(res => res.ok ? res.json() : Promise.reject(res.statusText))

  getInitialCards(token) {
    return this._customFetch(`${this._baseUrl}/cards`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
  }

  getUserinfo(token) {
    return this._customFetch(`${this._baseUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
  }

  updateUserInfo(data, token) {
    return this._customFetch(`${this._baseUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
  }

  createCard(data, token) {
    return this._customFetch(`${this._baseUrl}/cards`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  deleteCard(cardId, token) {
    return this._customFetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'DELETE'
    })
  }

  changeLikeCardStatus(cardId, isLiked, token) {
    return this._customFetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      headers: this._headers,
      method: isLiked ? 'DELETE' : 'PUT'
    })
  }

  setUserAvatar({ avatar, token }) {
    return this._customFetch(`${this._baseUrl}/users/me/avatar`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({ avatar })
    })
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3000',
});

export default api;
