import commentApi from '../API/commentApi';

export const fetchComment = async () => {
  try {
    const { data } = await commentApi.getAll();

    return data;
  } catch (error) {
    console.log(error);
  }
};
