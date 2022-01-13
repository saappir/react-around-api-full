
export const BASE_URL = "https://api.saappir.students.nomoreparties.sbs";

export const resHandler = (res) => res.ok ? res.json() : Promise.reject(res.statusText);

export const register = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => resHandler(res))
};

export const login = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => resHandler(res))
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        return data;
      }
      else {
        return;
      }
    })
}

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then(res => resHandler(res))
    .then((data) => data)
}
