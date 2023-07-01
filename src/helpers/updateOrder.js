import Swal from 'sweetalert2';
import orderApi from '../API/orderApi';

export const updateOrder = async (data) => {
  try {
    await orderApi.update(data);

    // Hiện thông báo update thành công
    Swal.fire({
      icon: 'success',
      title: 'Item has been added to cart',
      showConfirmButton: false,
      timer: 2000,
    });
  } catch (error) {
    console.log(error);
  }
};
