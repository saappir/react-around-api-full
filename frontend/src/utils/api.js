class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _customFetch = (baseUrl) =>
    fetch(baseUrl)
      .then(res => res.ok ? res.json() : Promise.reject(res.statusText))

  getInitialCards() {
    return this._customFetch(`${this._baseUrl}/cards`)
  }

  getUserinfo() {
    return this._customFetch(`${this._baseUrl}/users/me`)
  }

  updateUserInfo(data) {
    return this._customFetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
  }

  createCard(data) {
    return this._customFetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  deleteCard(cardId) {
    return this._customFetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE'
    })
  }

  changeLikeCardStatus(cardId, isLiked) {
    return this._customFetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: isLiked ? 'PUT' : 'DELETE'
    })
  }

  setUserAvatar({ avatar }) {
    return this._customFetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({ avatar })
    })
  }
}

const api = new Api({
  baseUrl: "https://api.saappir.students.nomoreparties.sbs",
});

export default api;
