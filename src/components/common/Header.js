import { Badge, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo-white.png';
import { logout } from '../../redux/slices/authSlice';
import styles from './Header.module.scss';
import './Header.scss';
import Swal from 'sweetalert2';
import { selectTotalUnpaidItem } from '../../redux/slices/orderedItemSlice';

export function Header() {
    const [isLogin, setIsLogin] = useState(false);
    const [userId, setUserId] = useState('');

    const { pathname } = useLocation();
    const history = useHistory();

    const dispatch = useDispatch();
    const totalUnpaidItem = useSelector(selectTotalUnpaidItem);

    const handleLogout = async () => {
        // Set access_token = empty
        localStorage.clear();

        // Delete current user on redux store
        await dispatch(logout());

        setIsLogin(false);
        setUserId('');

        if (pathname == '/') {
            window.location.reload();
        } else {
            history.push('/');
        }
    };

    const handleLogin = () => {
        localStorage.setItem('path', pathname);

        history.push('/login');
    };

    const handleClickCart = () => {
        // Kiểm tra đã login hay chưa
        // CHƯA: navagate to Login Page
        // RỒI: Kiểm tra xem có order chưa thanh toán không
        // CÓ: navigate to CartPage
        // KHÔNG: hiện thông báo không có order

        if (!isLogin) {
            localStorage.setItem('path', pathname);
            history.push('/login');
        } else {
            if (totalUnpaidItem !== 0) {
                history.push('/cart');
            } else {
                // Hiện thông báo update thành công
                Swal.fire({
                    icon: 'error',
                    title: 'There aren&apos;t any items in cart',
                    showConfirmButton: false,
                    timer: 5000,
                });
            }
        }
    };

    useEffect(() => {
        // If logined
        const accessToken = localStorage.getItem('access_token');

        if (accessToken) {
            setIsLogin(true);
            setUserId(accessToken);
        } else {
            setIsLogin(false);
        }
    }, []);

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
                        <Link to='/login' className={styles.disabled}>
                            <i className={`${styles.icon} las la-user`} />
                        </Link>
                        <div className={styles.dropdown}>
                            <Link to={`/user/edit-profile`}>Edit Profile</Link>
                            <Link to={`/user/change-password`}>Change Password</Link>
                            <Button
                                type='text'
                                block
                                onClick={handleLogout}
                                className={styles.logoutBtn}
                            >
                                Logout
                            </Button>
                        </div>
                    </div>
                    <Badge count={totalUnpaidItem} size='small' offset={[-1, 4]}>
                        <div onClick={handleClickCart} className={styles.cartIcon}>
                            <i className={`${styles.icon} las la-shopping-cart`} />
                        </div>
                    </Badge>
                </div>
            ) : (
                <div className={`${styles.leftIcon} leftIcon`}>
                    <div>
                        <Link to='/login' className={styles.disabled}>
                            <i className={`${styles.icon} las la-user`} />
                        </Link>
                        <div className={styles.dropdown}>
                            <Link to={`/register`}>Register</Link>
                            <Button
                                type='text'
                                block
                                onClick={handleLogin}
                                className={styles.loginBtn}
                            >
                                Login
                            </Button>
                        </div>
                    </div>
                    <div onClick={handleClickCart} className={styles.cartIcon}>
                        <i className={`${styles.icon} las la-shopping-cart`} />
                    </div>
                </div>
            )}
        </div>
    );
}
