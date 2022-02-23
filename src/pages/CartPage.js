import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import userApi from '../API/userApi';
import { CartTable, PaymentMethod, PurchaseButton, UserInfo } from '../components/cart';
import { Footer, Header } from '../components/common';
import styles from './ProductListPage.module.scss';

function CartPage() {
    const [orderQuantity, setOrderQuantity] = useState(0);
    const [user, setUser] = useState({});

    const dispatch = useDispatch();

    const fetchUserById = async (id) => {
        try {
            const data = await userApi.getById(id);

            setUser(data[0]);
        } catch (error) {
            console.log('Cant get user by ID');
        }
    };

    useEffect(() => {
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
            <CartTable />
            <UserInfo user={user} />
            <PaymentMethod />
            <PurchaseButton />
            <Footer />
        </div>
    );
}

export default CartPage;
