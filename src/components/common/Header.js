import { Menu } from 'antd';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../assets/images/logo-white.png';
import styles from './Header.module.scss';

const { SubMenu } = Menu;

export function Header({ current }) {
    const history = useHistory();

    const menNavigate = () => {
        history.push('/products/men');
    };

    const womenNavigate = () => {
        history.push('/products/woman');
    };

    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Link to='/'>
                    <img src={logo} alt='logo' />
                </Link>
            </div>
            <div>
                <ul className={styles.menu}>
                    <li className={styles.menuItem}>
                        <Link to='/'>Home</Link>
                    </li>
                    <li className={styles.menuItem}>
                        <Link to='/products/men'>Men</Link>
                    </li>
                    <li className={styles.menuItem}>
                        <Link to='/products/women'>Women</Link>
                    </li>
                    <li className={styles.menuItem}>
                        <Link to='/products/kids'>Kids</Link>
                    </li>
                    <li className={styles.menuItem}>
                        <Link to='/products/shoes'>Shoes</Link>
                    </li>
                </ul>
            </div>
            <div className={styles.icon}>
                <Link to='/login'>
                    <i className={`${styles.icon} las la-user`} />
                </Link>

                <Link to='/cart'>
                    <i className={`${styles.icon} las la-shopping-cart`} />
                </Link>
            </div>
        </div>
    );
}
