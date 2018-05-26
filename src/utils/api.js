import { BASE_URL } from '../constants';

class ApiError extends Error {
  constructor(message, body, original = null) {
    super(message);
    this.body = body;
    this.original = original;
  }
}

const wrap = promise =>
  promise
    .then(async (resp) => {
      if (resp.ok) {
        return resp;
      }

      const json = await resp.json();
      throw new ApiError('API Error', json);
    })
    .catch((error) => {
      throw new ApiError('Fetch error', { message: 'Network error!' }, error)
    });


export const apiPost = (url, body = null) =>
  wrap(fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    body: body && JSON.stringify(body),
  }));
