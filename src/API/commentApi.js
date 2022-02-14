import axiosClient from './axiosClient';

const commentApi = {
    getAll() {
        const url = '/comments';

        return axiosClient.get(url);
    },
};

export default commentApi;
