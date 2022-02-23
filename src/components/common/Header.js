import { unwrapResult } from '@reduxjs/toolkit';
import { Badge, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo-white.png';
import { logout } from '../../redux/slices/authSlice';
import styles from './Header.module.scss';
import './Header.scss';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export function Header({ quantity }) {
    const [isLogin, setIsLogin] = useState(false);
    const [userId, setUserId] = useState('');

    const { pathname } = useLocation();
    const history = useHistory();

    const dispatch = useDispatch();

    const handleLogout = async () => {
        // Set access_token = empty
        localStorage.clear();

        // Delete current user on redux store
        await dispatch(logout());

        // refresh Home Page
        setIsLogin(false);
    };

    const handleLogin = () => {
        localStorage.setItem('path', pathname);

        history.push('/login');
    };

    const handleClickCart = () => {
        // Kiểm tra xem có order chưa thanh toán không
        // CÓ: navigate to CartPage
        // KHÔNG: hiện thông báo không có order
        if (quantity != 0) {
            history.push('/cart');
        } else {
            // Hiện thông báo update thành công
            Swal.fire({
                icon: 'error',
                title: 'There aren&apos;t any items in cart',
                showConfirmButton: false,
                timer: 2000,
            });
        }
    };

    useEffect(() => {
        // If logined
        const accessToken = localStorage.getItem('access_token');

        if (Boolean(accessToken)) {
            setIsLogin(true);
            setUserId(accessToken);
        } else {
            setIsLogin(false);
        }
    }, [isLogin, quantity]);

    return (
        <div className={styles.header}>
            {/* Logo */}
            <div className={styles.logo}>
                <Link to='/'>
                    <img src={logo} alt='logo' />
                </Link>
            </div>
            {/* Menu */}
            <div>
                <ul className={styles.menu}>
                    <li className={styles.menuItem}>
                        <Link to='/'>Home</Link>
                    </li>
                    <li className={styles.menuItem}>
                        <Link to='/products/men'>Men</Link>
                        <div className={styles.dropdown}>
                            <Link to='/products/men/shirt'>Shirt</Link>
                            <Link to='/products/men/trousers'>Trousers</Link>
                        </div>
                    </li>
                    <li className={styles.menuItem}>
                        <Link to='/products/women'>Women</Link>
                        <div className={styles.dropdown}>
                            <Link to='/products/women/shirt'>Shirt</Link>
                            <Link to='/products/women/trousers'>Trousers</Link>
                        </div>
                    </li>
                    <li className={styles.menuItem}>
                        <Link to='/products/kids'>Kids</Link>
                    </li>
                    <li className={styles.menuItem}>
                        <Link to='/products/shoes'>Shoes</Link>
                        <div className={styles.dropdown}>
                            <Link to='/products/shoes/men'>Men</Link>
                            <Link to='/products/shoes/women'>Women</Link>
                        </div>
                    </li>
                </ul>
            </div>
            {/* Left bar */}
            {isLogin ? (
                <div className={`${styles.leftIcon} leftIcon`}>
                    <div>
                        <Link to='/login'>
                            <i className={`${styles.icon} las la-user`} />
                        </Link>
                        <div className={styles.dropdown}>
                            <Link to={`/user/update/:${userId}`}>Edit Account</Link>
                            <Button type='text' block onClick={handleLogout}>
                                Logout
                            </Button>
                        </div>
                    </div>
                    <Badge count={quantity} size='small' offset={[-1, 4]}>
                        <div onClick={handleClickCart} className={styles.cartIcon}>
                            <i className={`${styles.icon} las la-shopping-cart`} />
                        </div>
                    </Badge>
                </div>
            ) : (
                <div>
                    <Button type='primary' className={styles.loginBtn} onClick={handleLogin}>
                        <Link to='/login'>Login</Link>
                    </Button>
                </div>
            )}
        </div>
    );
}
