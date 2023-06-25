import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:3001/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

const AUTH_TOKEN = `Bearer ${window.localStorage.getItem('access_token')}`; 

axiosClient.defaults.headers.common['Authorization'] = AUTH_TOKEN;

// Add a response interceptor
axiosClient.interceptors.response.use(
    function (response) {
        // console.log('x-total-count', response.headers['x-total-count']);
        // Lấy ra tổng số sản phầm từ trường x-total-count
        if (response.data.totalRow) {
            return { data: response.data.data, totalRow: response.data.totalRow };
        }

        return { data: response.data.data };
    },
    function (error) {
        return Promise.reject(error.response.data);
    }
);

export default axiosClient;
