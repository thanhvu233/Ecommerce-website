import axiosClient from './axiosClient';

const orderApi = {
    getById(id) {
        const url = `/orders?orderId=${id}`;

        return axiosClient.get(url);
    },
    add(data) {
        const url = '/orders';

        return axiosClient.post(url, data);
    },
    update({ id, ...data }) {
        const url = `/orders?orderId=${id}`;

        return axiosClient.patch(url, data);
    },
    delete(id) {
        const url = `/orders?orderId=${id}`;

        return axiosClient.delete(url);
    },
};

export default orderApi;
