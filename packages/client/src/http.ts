type Params = typeof fetch;

export const createHttp = (fetch: Params) => {
  return {
    async get(url: string) {
      return fetch(url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'GET',
      }).then((data) => {
        return data.json();
      });
    },
    async post(url: string) {
      return fetch(url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }).then((data) => {
        return data.json();
      });
    },
  };
};
