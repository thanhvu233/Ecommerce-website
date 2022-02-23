import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userApi from '../API/userApi';
import { CartTable, PaymentMethod, PurchaseButton, UserInfo } from '../components/cart';
import { Footer, Header } from '../components/common';
import { fetchOrderList, selectOrderFilter, selectOrderList } from '../redux/slices/orderSlice';
import styles from './ProductListPage.module.scss';

function CartPage() {
    const [orderQuantity, setOrderQuantity] = useState(0);
    const [user, setUser] = useState({});

    const orderFilter = useSelector(selectOrderFilter);
    const orderList = useSelector(selectOrderList);
    const dispatch = useDispatch();

    const fetchUserById = async (id) => {
        try {
            const { data } = await userApi.getById(id);

            setUser(data[0]);
        } catch (error) {
            console.log('Cant get user by ID');
        }
    };

    useEffect(() => {
        dispatch(
            fetchOrderList({
                ...orderFilter,
                isCheckout: false,
                userId: localStorage.getItem('access_token'),
            })
        )

        if (localStorage.getItem('quantity')) {
            setOrderQuantity(localStorage.getItem('quantity'));
        } else {
            setOrderQuantity(0);
        }

        fetchUserById(localStorage.getItem('access_token'));

        // Scroll to top when navigate from other page
        window.scrollTo(0, 0);
    }, [dispatch]);

    // console.log('orderList', orderList);

    return (
        <div className={styles.wrapper}>
            <Header quantity={orderQuantity} />
            <CartTable  />
            <UserInfo user={user} />
            <PaymentMethod />
            <PurchaseButton />
            <Footer />
        </div>
    );
}

export default CartPage;
