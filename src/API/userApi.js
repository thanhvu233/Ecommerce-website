import axiosClient from './axiosClient';

const userApi = {
  signUp(data) {
    const url = '/users/signup';

    return axiosClient.post(url, data);
  },
  login(data) {
    const url = '/users/login';

    return axiosClient.post(url, data);
  },
  getCurrentUser() {
    const url = `/users/me`;

    const token = localStorage.getItem('access_token');

    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  updateUserProfile(data) {
    const url = `/users/updateMe`;

    const token = localStorage.getItem('access_token');

    return axiosClient.patch(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  updateUserPassword(data) {
    const url = `/users/updateMyPassword`;

    const token = localStorage.getItem('access_token');

    return axiosClient.patch(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default userApi;
