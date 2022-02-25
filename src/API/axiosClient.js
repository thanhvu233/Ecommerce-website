import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://thanh-server.herokuapp.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a response interceptor
axiosClient.interceptors.response.use(
    function (response) {
        // console.log('x-total-count', response.headers['x-total-count']);
        // Lấy ra tổng số sản phầm từ trường x-total-count
        return { data: response.data, totalRow: response.headers['x-total-count'] };
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default axiosClient;
