import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import orderApi from '../API/orderApi';

const MySwal = withReactContent(Swal);

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
