import axiosClient from './axiosClient';

const userApi = {
    getById(id) {
        const url = `/users?userId=${id}`;

        return axiosClient.get(url);
    },
    getByAccount({ username, pwd }) {
        const url = `/users?username=${username}&password=${pwd}`;

        return axiosClient.get(url);
    },
};

export default userApi;
