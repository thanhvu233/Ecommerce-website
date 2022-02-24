import { unwrapResult } from '@reduxjs/toolkit';
import { Button } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchOrderList, selectOrderFilter } from '../redux/slices/orderSlice';
import styles from '../components/common/_global.module.scss';
import { Header } from './../components/common/Header';
import { Main } from '../components/login';
import { fetchUserByAcc } from '../redux/slices/authSlice';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function LoginPage() {
    const history = useHistory();

    const orderFilter = useSelector(selectOrderFilter);
    const dispatch = useDispatch();

    const initialValues = {
        username: '',
        password: '',
    };

    const path = localStorage.getItem('path');

    // const handleClick = async () => {
    //     const actionResult = await dispatch(
    //         fetchOrderList({
    //             ...orderFilter,
    //             isCheckout: false,
    //             userId: localStorage.getItem('access_token'),
    //         })
    //     );

    //     let { data: result } = unwrapResult(actionResult);
    //     let quantity = 0;

    //     // Lấy ra số lượng product chưa thanh toán trong cart
    //     // nếu còn đơn chưa thanh toán
    //     if (result.length != 0) {
    //         quantity = result[0].products.length;
    //     }

    //     localStorage.setItem('quantity', quantity);
    //     localStorage.setItem('access_token', 'bfb8ed25-84e0-4bad-b366-751f66276b7b');

    //     history.push(`${path}`);
    // };

    const handleFormSubmit = async (formValues) => {
        // Gọi API để kiểu tra account
        const userResult = await dispatch(fetchUserByAcc(formValues));

        const { data: userAcc } = unwrapResult(userResult);

        if (userAcc.length == 0) {
            Swal.fire({
                icon: 'error',
                title: 'User doesn&apos;t exist',
                showConfirmButton: false,
                timer: 2000,
            });
        } else {
            // Gọi API để lấy unfinished order
            const actionResult = await dispatch(
                fetchOrderList({
                    ...orderFilter,
                    isCheckout: false,
                    userId: userAcc[0].userId,
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
            localStorage.setItem('access_token', userAcc[0].userId);
            history.push(`${path}`);
        }
    };

    return (
        // <Button type='primary' onClick={handleClick}>
        //     Login
        // </Button>
        <div className={styles.wrapper}>
            <Header />
            <Main initialValues={initialValues} onSubmit={handleFormSubmit} />
        </div>
    );
}

export default LoginPage;
