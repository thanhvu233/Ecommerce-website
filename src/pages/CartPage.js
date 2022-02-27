import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import orderApi from '../API/orderApi';
import { CartTable, PaymentMethod, PurchaseButton, UserInfo } from '../components/cart';
import { Footer, Header } from '../components/common';
import { fetchUserById } from '../helpers/fetchUserById';
import {
    fetchOrderList,
    selectOrderFilter,
    selectOrderProgressed,
} from '../redux/slices/orderSlice';
import styles from './ProductListPage.module.scss';
import LoadingPage from './LoadingPage';

function CartPage() {
    const [orderQuantity, setOrderQuantity] = useState(0);
    const [user, setUser] = useState({});
    const [orderList, setOrderList] = useState([]);
    const [orderId, setOrderId] = useState();

    const orderFilter = useSelector(selectOrderFilter);
    const loading = useSelector(selectOrderProgressed);
    const dispatch = useDispatch();

    const history = useHistory();

    const removeItem = async (productId, size, orderId) => {
        try {
            const newOrderList = orderList.filter((item) => {
                return (
                    item.productId != productId ||
                    (item.size != size && item.productId == productId)
                );
            });

            await orderApi.update({
                id: orderId,
                products: newOrderList,
            });

            localStorage.setItem('quantity', newOrderList.length);

            // Re-render component
            setOrderList(newOrderList);
            setOrderQuantity(newOrderList.length);
        } catch (error) {
            console.log('Cant remove item from cart', error);
        }
    };

    const handleRemove = (item) => {
        Swal.fire({
            icon: 'info',
            title: 'Do you really want to remove this item?',
            confirmButtonText: 'Yes',
            showDenyButton: true,
            denyButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                // Goi API update data
                removeItem(item.productId, item.size, orderId);
            }
        });
    };

    const handleAmountChange = async (product, value) => {
        try {
            // Tìm product có id được chọn
            const objTarget = orderList.find((item) => {
                return item.productId == product.productId && item.size == product.size;
            });

            // Update amount và subTotal
            const newObj = {
                ...objTarget,
                amount: value,
                subTotal: (product.subTotal / product.amount) * value,
            };

            // Lấy ra các product khác
            const newOrderList = orderList.filter((item) => {
                return (
                    item.productId != product.productId ||
                    (item.productId == product.productId && item.size != product.size)
                );
            });

            // Thêm product mới sửa vào mảng products mới
            newOrderList.push(newObj);

            await orderApi.update({
                id: orderId,
                products: newOrderList,
            });

            Swal.fire({
                icon: 'success',
                title: 'Change quantity of items successfully',
                showConfirmButton: false,
                timer: 2000,
            });

            setTimeout(() => {
                setOrderList(newOrderList);
            }, 500);
        } catch (error) {
            console.log('Can@apos;t update quantity for item', error);
        }
    };

    const handlePurchase = async () => {
        // set quantity in localStore = 0
        localStorage.setItem('quantity', 0);

        // Set isCheckout = true
        await orderApi.update({
            id: orderId,
            isCheckout: true,
        });

        Swal.fire({
            icon: 'success',
            title: 'Purchase Successfully',
            showConfirmButton: false,
            timer: 2000,
        });

        setTimeout(() => {
            history.push('/');
        }, 2000);
    };

    useEffect(async () => {
        const actionResult = await dispatch(
            fetchOrderList({
                ...orderFilter,
                isCheckout: false,
                userId: localStorage.getItem('access_token'),
            })
        );

        const result = unwrapResult(actionResult);

        setOrderList(result.data[0].products);
        setOrderId(result.data[0].id);

        if (localStorage.getItem('quantity')) {
            setOrderQuantity(localStorage.getItem('quantity'));
        } else {
            setOrderQuantity(0);
        }

        const user = await fetchUserById(localStorage.getItem('access_token'));

        setUser(user[0]);

        // Scroll to top when navigate from other page
        window.scrollTo(0, 0);
    }, [dispatch]);

    if (loading) {
        return <LoadingPage />;
    }

    return (
        <div className={styles.wrapper}>
            <Header quantity={orderQuantity} />
            <CartTable
                list={orderList}
                onRemove={handleRemove}
                onAmountChange={handleAmountChange}
            />
            <UserInfo user={user} />
            <PaymentMethod />
            <PurchaseButton onPurchase={handlePurchase} />
            <Footer />
        </div>
    );
}

export default CartPage;
