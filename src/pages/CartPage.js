import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userApi from '../API/userApi';
import { CartTable, PaymentMethod, PurchaseButton, UserInfo } from '../components/cart';
import { Footer, Header } from '../components/common';
import { fetchOrderList, selectOrderFilter } from '../redux/slices/orderSlice';
import styles from './ProductListPage.module.scss';

function CartPage() {
    const [orderQuantity, setOrderQuantity] = useState(0);
    const [user, setUser] = useState({});
    const [orderList, setOrderList] = useState([]);

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
            <CartTable list={orderList} />
            <UserInfo user={user} />
            <PaymentMethod />
            <PurchaseButton />
            <Footer />
        </div>
    );
}

export default CartPage;
