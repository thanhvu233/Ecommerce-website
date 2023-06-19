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
    getFeatureProducts() {
        const url = '/products/feature-products';

        return axiosClient.get(url);
    },
    getLatestProducts() {
        const url = '/products/latest-products';

        return axiosClient.get(url);
    },
    getSignatureProduct() {
        const url = '/products/signature-product';

        return axiosClient.get(url);
    }
};

export default productApi;
