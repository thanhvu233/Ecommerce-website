import axiosClient from './axiosClient';

const orderApi = {
  getAll(params) {
    const url = '/orders';

    return axiosClient.get(url, {
      params,
    });
  },
  update({ id, ...data }) {
    const url = `/orders/${id}`;

    const token = localStorage.getItem('access_token');

    return axiosClient.patch(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  delete(id) {
    const url = `/orders/${id}`;

    const token = localStorage.getItem('access_token');

    return axiosClient.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  createOne(data) {
    const url = '/orders';

    const token = localStorage.getItem('access_token');

    return axiosClient.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default orderApi;
