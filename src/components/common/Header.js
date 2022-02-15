import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons/lib/icons';
import { Menu } from 'antd';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo-white.png';
import styles from './Header.module.scss';

const { SubMenu } = Menu;

export function Header() {
    const history = useHistory();

    const menNavigate = () => {
        history.push('/products/men');
    };

    const womenNavigate = () => {
        history.push('/products/woman');
    };

    return (
        <Menu mode='horizontal' className={styles.menu}>
            <div className={styles.menuItem}>
                <Menu.Item key='logo'>
                    <Link to='/'>
                        <img src={logo} alt='logo' className={styles.logo} />
                    </Link>
                </Menu.Item>
            </div>
            <div className={styles.menuItem}>
                <Menu.Item key='home'>
                    <Link to='/'>Home</Link>
                </Menu.Item>

                <SubMenu key='men' title='Men' onTitleClick={menNavigate}>
                    <Menu.Item key='men-shirt'>
                        <Link to='/products/men/shirt'>Shirt</Link>
                    </Menu.Item>
                    <Menu.Item key='men-trousers'>
                        <Link to='/products/men/trousers'>Trousers</Link>
                    </Menu.Item>
                </SubMenu>

                <SubMenu key='women' title='Women' onTitleClick={womenNavigate}>
                    <Menu.Item key='women-shirt'>
                        <Link to='/products/women/shirt'>Shirt</Link>
                    </Menu.Item>
                    <Menu.Item key='women-trousers'>
                        <Link to='/products/women/trousers'>Trousers</Link>
                    </Menu.Item>
                </SubMenu>

                <Menu.Item key='kids'>
                    <Link to='/products/kids'>Kids</Link>
                </Menu.Item>

                <SubMenu key='shoes' title='Shoes' onTitleClick={menNavigate}>
                    <Menu.Item key='shoes-shirt'>
                        <Link to='/products/shoes/men'>Men</Link>
                    </Menu.Item>
                    <Menu.Item key='men-trousers'>
                        <Link to='/products/shoes/women'>Women</Link>
                    </Menu.Item>
                </SubMenu>
            </div>
            <div className={styles.menuItem}>
                <Menu.Item key='login' icon={<i className={`${styles.icon} las la-user`}></i>}>
                    <Link to='/login'></Link>
                </Menu.Item>
                <Menu.Item
                    key='cart'
                    icon={<i className={`${styles.icon} las la-shopping-cart`}></i>}
                >
                    <Link to='/cart'></Link>
                </Menu.Item>
            </div>
        </Menu>
    );
}
