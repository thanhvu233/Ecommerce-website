import React from 'react';
import { Container } from '../common';
import styles from './UserInfo.module.scss';

export function UserInfo({ user }) {
    return (
        <Container>
            <div className={styles.userInfo}>
                <div className={styles.header}>
                    <span className={styles.locationImg}>
                        <img src='https://img.icons8.com/color/48/000000/marker--v1.png' />
                    </span>
                    <p>Delivery Address</p>
                </div>
                <div className={styles.detail}>
                    <span className={styles.name}>{user.name}</span>
                    <span className={styles.phone}>{user.phone}</span>
                    <span className={styles.address}>{user.address}</span>
                </div>
            </div>
        </Container>
    );
}
