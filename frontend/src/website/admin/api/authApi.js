import { adminFetch } from './adminApiClient';

export const authApi = {
  login: async (usernameOrEmail, password) => {
    const res = await adminFetch('/admin-login/', {
      method: 'POST',
      body: JSON.stringify({
        email: usernameOrEmail,
        username: usernameOrEmail,
        password
      })
    });
    return res;
  },

  logout: async () => {
    const res = await adminFetch('/admin-logout/', {
      method: 'POST'
    });
    return res;
  }
};

export default authApi;
