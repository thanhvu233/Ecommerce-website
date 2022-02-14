import axiosClient from './axiosClient';

const productApi = {
    getAll(params) {
        const url = '/products';

        return axiosClient.get(url, {
            params,
        });
    },
    getById(id) {
        const url = `/products?productId=${id}`;

        return axiosClient.get(url);
    },
};

export default productApi;
