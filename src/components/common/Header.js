import { Badge, Button, Divider, Drawer, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo-white.png';
import styles from './Header.module.scss';
import './Header.scss';
import Swal from 'sweetalert2';
import { selectTotalUnpaidItem } from '../../redux/slices/orderedItemSlice';
import { MenuOutlined } from '@ant-design/icons';

export function Header() {
  const [isLogin, setIsLogin] = useState(false);

  const [showDrawer, setShowDrawer] = useState(false);

  const { pathname } = useLocation();
  const history = useHistory();

  const totalUnpaidItem = useSelector(selectTotalUnpaidItem);

  useEffect(() => {
    // If logined
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  const handleLogout = async () => {
    // Set access_token = empty
    localStorage.clear();

    setIsLogin(false);

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
    if (!isLogin) {
      localStorage.setItem('path', pathname);
      history.push('/login');
    } else {
      if (totalUnpaidItem !== 0) {
        history.push('/cart');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'There are no items in cart',
          showConfirmButton: false,
          timer: 5000,
        });
      }
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Link to='/'>
            <img src={logo} alt='logo' />
          </Link>
        </div>
        <div className={styles.navbar}>
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
            <Badge size='small' offset={[-1, 4]}>
              <div onClick={handleClickCart} className={styles.cartIcon}>
                <i className={`${styles.icon} las la-shopping-cart`} />
              </div>
            </Badge>
          </div>
        )}
        <Button
          type='primary'
          shape='circle'
          icon={<MenuOutlined />}
          size='middle'
          className={styles.toggleBtn}
          onClick={() => setShowDrawer(true)}
        />
      </div>
      <Drawer
        title=''
        placement='right'
        onClose={() => setShowDrawer(false)}
        open={showDrawer}
        getContainer={false}
        className={`${showDrawer ? 'show-drawer' : 'hide-drawer'}`}
      >
        <Menu mode='vertical'>
          <Menu.Item
            key='home'
            onClick={() => {
              history.push('/');
              setShowDrawer(false);
            }}
          >
            Home
          </Menu.Item>
          <Divider className={styles.divider} />
          <Menu.SubMenu
            key='men'
            title='Men'
            onTitleClick={() => {
              history.push('/products/men');
              setShowDrawer(false);
            }}
          >
            <Menu.Item
              key='men-shirt'
              onClick={() => {
                history.push('/products/men/shirt');
                setShowDrawer(false);
              }}
            >
              Shirt
            </Menu.Item>
            <Divider className={styles.divider} />
            <Menu.Item
              key='men-trousers'
              onClick={() => {
                history.push('/products/men/trousers');
                setShowDrawer(false);
              }}
            >
              Trousers
            </Menu.Item>
          </Menu.SubMenu>
          <Divider className={styles.divider} />
          <Menu.SubMenu
            key='women'
            title='Women'
            onTitleClick={() => {
              history.push('/products/women');
              setShowDrawer(false);
            }}
          >
            <Menu.Item
              key='women-shirt'
              onClick={() => {
                history.push('/products/women/shirt');
                setShowDrawer(false);
              }}
            >
              Shirt
            </Menu.Item>
            <Divider className={styles.divider} />
            <Menu.Item
              key='women-trousers'
              onClick={() => {
                history.push('/products/women/trousers');
                setShowDrawer(false);
              }}
            >
              Trousers
            </Menu.Item>
          </Menu.SubMenu>
          <Divider className={styles.divider} />
          <Menu.Item
            key='kids'
            onClick={() => {
              history.push('/products/kids');
              setShowDrawer(false);
            }}
          >
            Kids
          </Menu.Item>
          <Divider className={styles.divider} />
          <Menu.SubMenu
            key='shoes'
            title='Shoes'
            onTitleClick={() => {
              history.push('/products/shoes');
              setShowDrawer(false);
            }}
          >
            <Menu.Item
              key='men-shoes'
              onClick={() => {
                history.push('/products/shoes/men');
                setShowDrawer(false);
              }}
            >
              Men
            </Menu.Item>
            <Divider className={styles.divider} />
            <Menu.Item
              key='women-shoes'
              onClick={() => {
                history.push('/products/shoes/women');
                setShowDrawer(false);
              }}
            >
              Women
            </Menu.Item>
          </Menu.SubMenu>
          <Divider className={styles.divider} />
          <Menu.SubMenu key='user' title='User'>
            {isLogin ? (
              <>
                <Menu.Item
                  key='edit-profile'
                  onClick={() => {
                    history.push('/user/edit-profile');
                    setShowDrawer(false);
                  }}
                >
                  Edit Profile
                </Menu.Item>
                <Divider className={styles.divider} />
                <Menu.Item
                  key='change-password'
                  onClick={() => {
                    history.push('/user/change-password');
                    setShowDrawer(false);
                  }}
                >
                  Change Password
                </Menu.Item>
                <Divider className={styles.divider} />
                <Menu.Item
                  key='logout'
                  onClick={handleLogout}
                  style={{
                    color: 'red',
                  }}
                >
                  Logout
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item
                  key='register'
                  onClick={() => {
                    history.push('/register');
                    setShowDrawer(false);
                  }}
                >
                  Register
                </Menu.Item>
                <Divider className={styles.divider} />
                <Menu.Item key='login' onClick={handleLogin}>
                  Login
                </Menu.Item>
              </>
            )}
          </Menu.SubMenu>
          <Divider className={styles.divider} />
          <Menu.Item key='cart' onClick={handleClickCart}>
            Cart
          </Menu.Item>
          <Divider className={styles.divider} />
        </Menu>
      </Drawer>
    </>
  );
}
