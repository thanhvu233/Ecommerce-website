import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo-white.png';
import styles from './Header.module.scss';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';

export function Header() {
    const [isLogin, setIsLogin] = useState(false);
    const [userId, setUserId] = useState('');

    const dispatch = useDispatch();

    const handleLogout = () => {
        // Set access_token = empty
        localStorage.clear();

        // Delete current user on redux store
        dispatch(logout());

        // refresh Home Page
        setIsLogin(false);
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
    }, [isLogin]);

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
                <div className={styles.leftIcon}>
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
                    <div>
                        <Link to='/cart'>
                            <i className={`${styles.icon} las la-shopping-cart`} />
                        </Link>
                    </div>
                </div>
            ) : (
                <div>
                    <Button type='primary' className={styles.loginBtn}>
                        <Link to='/login'>Login</Link>
                    </Button>
                </div>
            )}
        </div>
    );
}
