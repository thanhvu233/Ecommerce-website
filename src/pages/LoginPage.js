import { unwrapResult } from '@reduxjs/toolkit';
import { Button } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchOrderList, selectOrderFilter } from '../redux/slices/orderSlice';
import styles from '../components/common/_global.module.scss';
import { Header } from './../components/common/Header';
import { LoginForm } from '../components/login';

function LoginPage() {
    const history = useHistory();

    const orderFilter = useSelector(selectOrderFilter);
    const dispatch = useDispatch();

    const path = localStorage.getItem('path');

    const handleClick = async () => {
        const actionResult = await dispatch(
            fetchOrderList({
                ...orderFilter,
                isCheckout: false,
                userId: localStorage.getItem('access_token'),
            })
        );

        let { data: result } = unwrapResult(actionResult);
        let quantity = 0;

        // Lấy ra số lượng product chưa thanh toán trong cart
        // nếu còn đơn chưa thanh toán
        if (result.length != 0) {
            quantity = result[0].products.length;
        }

        localStorage.setItem('quantity', quantity);
        localStorage.setItem('access_token', 'bfb8ed25-84e0-4bad-b366-751f66276b7b');

        history.push(`${path}`);
    };

    return (
        // <Button type='primary' onClick={handleClick}>
        //     Login
        // </Button>
        <div className={styles.wrapper}>
            <Header />
            <LoginForm />
        </div>
    );
}

export default LoginPage;
