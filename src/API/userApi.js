import axiosClient from './axiosClient';

const userApi = {
    getById(id) {
        const url = `/users?userId=${id}`;

        return axiosClient.get(url);
    },
    getByAccount({ username, password }) {
        const url = `/users?username=${username}&password=${password}`;

        return axiosClient.get(url);
    },
};

export default userApi;
