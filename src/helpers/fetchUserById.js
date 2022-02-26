import userApi from "../API/userApi";



export const fetchUserById = async (id) => {
    try {
        const { data } = await userApi.getById(id);

        return data;
    } catch (error) {
        console.log('Cant get user by ID');
    }
};