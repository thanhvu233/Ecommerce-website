import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userApi from '../API/userApi';
import { CartTable, PaymentMethod, PurchaseButton, UserInfo } from '../components/cart';
import { Footer, Header } from '../components/common';
import { fetchOrderList, selectOrderFilter } from '../redux/slices/orderSlice';
import styles from './ProductListPage.module.scss';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import orderApi from '../API/orderApi';

function CartPage() {
    const [orderQuantity, setOrderQuantity] = useState(0);
    const [user, setUser] = useState({});
    const [orderList, setOrderList] = useState([]);
    const [orderId, setOrderId] = useState();

    const orderFilter = useSelector(selectOrderFilter);
    const dispatch = useDispatch();

    const fetchUserById = async (id) => {
        try {
            const { data } = await userApi.getById(id);

            setUser(data[0]);
        } catch (error) {
            console.log('Cant get user by ID');
        }
    };

    const removeItem = async (productId, size, orderId) => {
        try {
            const newOrderList = orderList.filter((item) => {
                return item.productId != productId || item.size != size;
            });

            await orderApi.update({
                id: orderId,
                products: newOrderList,
            });

            // Re-render component
            setOrderList(newOrderList);
            setOrderQuantity(newOrderList.length);
        } catch (error) {
            console.log('Cant remove item from cart', error);
        }
    };

    const handleRemove = (e) => {
        Swal.fire({
            icon: 'info',
            title: 'Do you really want to remove this item?',
            confirmButtonText: 'Yes',
            showDenyButton: true,
            denyButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                // Goi API update data
                const productId = e.target.ariaCurrent;
                const productSize = e.target.ariaSetSize;

                removeItem(productId, productSize, orderId);
            }
        });
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

        fetchUserById(localStorage.getItem('access_token'));

        // Scroll to top when navigate from other page
        window.scrollTo(0, 0);
    }, [dispatch]);

    return (
        <div className={styles.wrapper}>
            <Header quantity={orderQuantity} />
            <CartTable list={orderList} onRemove={handleRemove} />
            <UserInfo user={user} />
            <PaymentMethod />
            <PurchaseButton />
            <Footer />
        </div>
    );
}

export default CartPage;
