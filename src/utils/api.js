import { BASE_URL } from '../constants';

class ApiError extends Error {
  constructor(message, body, original = null) {
    super(message);
    this.body = body;
    this.original = original;
  }

  toJSON() {
    return {
      message: this.message,
      body: this.body,
    };
  }
}

const wrap = promise =>
  promise
    .catch((error) => {
      throw new ApiError('Fetch error', { message: 'Network error!' }, error);
    })
    .then(async (resp) => {
      if (resp.ok) {
        return resp;
      }

      const json = await resp.json();
      throw new ApiError('API Error', json);
    });

export const apiGet = (url, jwt = null) =>
  wrap(fetch(`${BASE_URL}${url}`, {
    headers: {
      Authorization: `Bearer ${jwt || localStorage.getItem('jwt')}`,
    },
  }));

export const apiPostNoAuth = (url, body = null) =>
  wrap(fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    body: body && JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }));

export const apiPost = (url, body = null, jwt = null) =>
  wrap(fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    body: body && JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${jwt || localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
  }));

export const apiPut = (url, body = null, jwt = null) =>
  wrap(fetch(`${BASE_URL}${url}`, {
    method: 'PUT',
    body: body && JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${jwt || localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
  }));

export const apiDelete = (url, jwt = null) =>
  wrap(fetch(`${BASE_URL}${url}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${jwt || localStorage.getItem('jwt')}`,
    },
  }));
