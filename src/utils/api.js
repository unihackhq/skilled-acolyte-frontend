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


export const apiPostNoAuth = (url, body = null) =>
  wrap(fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    body: body && JSON.stringify(body),
  }));

export const apiGet = (url, jwt) =>
  wrap(fetch(`${BASE_URL}${url}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }));
