import axiosClient from './axiosClient';

const userApi = {
    getById(id) {
        const url = `/users?id=${id}`;

        return axiosClient.get(url);
    },
    getByAccount({ username, password }) {
        const url = `/users?username=${username}&password=${password}`;

        return axiosClient.get(url);
    },
    update(data) {
        const url = `/users/${data.id}`;

        return axiosClient.patch(url, data);
    },
    add(data) {
        const url = '/users';

        return axiosClient.post(url, data);
    },
    signUp(data) {
        const url = '/users/signup';

        return axiosClient.post(url, data);
    }
};

export default userApi;
