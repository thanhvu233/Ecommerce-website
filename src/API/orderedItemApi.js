import axiosClient from './axiosClient';

const orderedItemApi = {
    createOne(data) {
        const url = '/order-items';

        const token = localStorage.getItem('access_token');

        return axiosClient.post(url, data, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    },
    updateOne(data) {
        const url = `/order-items/${data._id}`;

        const token = localStorage.getItem('access_token');

        return axiosClient.patch(url, data, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    },
    getOne(data) {
        const url = `/order-items`;

        const token = localStorage.getItem('access_token');

        return axiosClient.get(url, {
            params: data,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    },
    getAllUnpaidItems() {
        const url = `/order-items/unpaid`;

        const token = localStorage.getItem('access_token');

        return axiosClient.get(url, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    },
    deleteOne(id) {
        const url = `/order-items/${id}`;

        const token = localStorage.getItem('access_token');

        return axiosClient.delete(url, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    },
};

export default orderedItemApi;
