import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://ecommerce-website-nodejs.onrender.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    if (response.data.totalRow) {
      return {
        data: response.data.data,
        totalRow: response.data.totalRow,
      };
    }

    return { data: response.data.data };
  },
  function (error) {
    return Promise.reject(error.response.data);
  }
);

export default axiosClient;
