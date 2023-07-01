import productApi from './../API/productApi';

export const fetchProductById = async (productId) => {
  try {
    const { data } = await productApi.getById(productId);

    return data;
  } catch (error) {
    console.log(error);
  }
};
