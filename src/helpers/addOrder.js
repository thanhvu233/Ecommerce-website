import Swal from 'sweetalert2';
import orderApi from '../API/orderApi';

export const addOrder = async (data) => {
    try {
        await orderApi.add(data);

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
