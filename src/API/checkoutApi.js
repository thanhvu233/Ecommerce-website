import axiosClient from './axiosClient';

const checkoutApi = {
  getCheckoutSession(id) {
    const url = `/checkout/checkout-session/${id}`;

    const token = localStorage.getItem('access_token');

    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default checkoutApi;
